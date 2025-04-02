const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FB_PROJECT_ID,
    clientEmail: process.env.FB_CLIENT_EMAIL,
    privateKey: process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

const db = admin.firestore();
const todayStr = new Date().toISOString().split("T")[0];

async function main() {
  await db.collection("appMeta").doc("policyVersions").set(
    {
      privacyPolicyVersion: todayStr,
      termsOfServiceVersion: todayStr,
    },
    { merge: true }
  );
  console.log(`Updated to ${todayStr}`);
}

main();
