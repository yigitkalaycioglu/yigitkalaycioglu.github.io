// StandBy+ çevrimdışı rota grafını OSM verisinden üretir (.github/workflows/rota.yml çalıştırır).
// Sürüm, uygulamadaki GraphHopper ile aynı olmalı: graf dosyaları yalnızca onu üreten sürümle açılır.
// RotaGrafi.java uygulama deposundaki tools/rota ile aynıdır; ayarlar OfflineRouting ile eşleşmeli.
plugins { application }

repositories { mavenCentral() }

dependencies {
    implementation("com.graphhopper:graphhopper-core:5.3")
    runtimeOnly("org.slf4j:slf4j-simple:1.7.36")
}

java { toolchain { languageVersion.set(JavaLanguageVersion.of(21)) } }

application {
    mainClass.set("RotaGrafi")
    applicationDefaultJvmArgs = listOf("-Xmx12g")
}
