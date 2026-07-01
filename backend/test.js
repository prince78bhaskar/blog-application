import dns from "dns/promises";

try {
  const result = await dns.resolveSrv("_mongodb._tcp.digi-quest.cgcsozl.mongodb.net");
  console.log(result);
} catch (err) {
  console.error(err);
}