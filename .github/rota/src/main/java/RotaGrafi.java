import com.graphhopper.GHRequest;
import com.graphhopper.GHResponse;
import com.graphhopper.GraphHopper;
import com.graphhopper.GraphHopperConfig;
import com.graphhopper.ResponsePath;
import com.graphhopper.config.CHProfile;
import com.graphhopper.config.Profile;
import com.graphhopper.util.Instruction;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * Kullanım: RotaGrafi <osm.pbf> <çıktı klasörü> <zip yolu>
 * Yalnızca araç profili ve hızlandırma ağı (CH) ile graf üretir, telefondaki gibi (MMAP) açıp örnek rota
 * hesaplar ve klasörü uygulamanın açacağı zip'e koyar. Ayarlar uygulamadaki OfflineRouting ile aynı olmalı.
 */
public class RotaGrafi {
    static GraphHopperConfig config(String dir) {
        GraphHopperConfig c = new GraphHopperConfig();
        c.putObject("graph.location", dir);
        c.putObject("graph.flag_encoders", "car");
        c.setProfiles(List.of(new Profile("car").setVehicle("car").setWeighting("fastest").setTurnCosts(false)));
        c.setCHProfiles(List.of(new CHProfile("car")));
        return c;
    }

    public static void main(String[] args) throws Exception {
        String pbf = args[0], dir = args[1], zip = args[2];
        long t0 = System.currentTimeMillis();
        GraphHopperConfig c = config(dir);
        c.putObject("datareader.file", pbf);
        // Araç girmeyen yollar grafa alınmaz (boyutu küçültür)
        c.putObject("import.osm.ignored_highways", "footway,cycleway,path,pedestrian,steps,bridleway,corridor,construction,proposed,platform");
        c.putObject("prepare.min_network_size", 200);
        GraphHopper imp = new GraphHopper().init(c);
        imp.importOrLoad();
        imp.close();
        System.out.printf("İçe aktarma: %d sn%n", (System.currentTimeMillis() - t0) / 1000);

        long size = 0;
        for (File f : new File(dir).listFiles()) { size += f.length(); System.out.printf("  %-28s %7.1f MB%n", f.getName(), f.length() / 1e6); }
        System.out.printf("Graf toplam: %.1f MB%n", size / 1e6);

        // Telefondaki gibi aç: bellek eşlemeli, yazmadan
        GraphHopperConfig rc = config(dir);
        rc.putObject("graph.dataaccess", "MMAP");
        GraphHopper hopper = new GraphHopper().init(rc);
        if (!hopper.load()) throw new IllegalStateException("graf açılamadı");
        double[][] tests = {
            {41.0369, 28.9850, 39.9208, 32.8541}, // Taksim → Kızılay
            {41.0082, 28.9784, 41.0430, 29.0094}, // Sultanahmet → Beşiktaş
            {38.4237, 27.1428, 36.8969, 30.7133}, // İzmir → Antalya
        };
        for (double[] t : tests) {
            long s = System.currentTimeMillis();
            GHResponse r = hopper.route(new GHRequest(t[0], t[1], t[2], t[3]).setProfile("car"));
            long ms = System.currentTimeMillis() - s;
            if (r.hasErrors()) { System.out.println("HATA: " + r.getErrors()); continue; }
            ResponsePath p = r.getBest();
            System.out.printf("Rota %.0f km, %d dk, %d nokta, %d talimat, %d ms%n",
                p.getDistance() / 1000, p.getTime() / 60000, p.getPoints().size(), p.getInstructions().size(), ms);
            int n = 0;
            for (Instruction i : p.getInstructions()) {
                if (n++ >= 4) break;
                System.out.printf("    işaret=%d ad='%s' %.0f m%n", i.getSign(), i.getName(), i.getDistance());
            }
        }
        hopper.close();

        try (ZipOutputStream z = new ZipOutputStream(new FileOutputStream(zip))) {
            byte[] buf = new byte[1 << 16];
            for (File f : new File(dir).listFiles()) {
                z.putNextEntry(new ZipEntry(f.getName()));
                try (FileInputStream in = new FileInputStream(f)) { int k; while ((k = in.read(buf)) > 0) z.write(buf, 0, k); }
                z.closeEntry();
            }
        }
        System.out.printf("Zip: %.1f MB (%s)%n", new File(zip).length() / 1e6, zip);
    }
}
