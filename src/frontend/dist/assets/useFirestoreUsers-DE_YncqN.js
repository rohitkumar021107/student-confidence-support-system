import { W as setDoc, L as doc, G as db, T as Timestamp, E as query, F as collection, H as where, X as getDocs } from "./index-D3xPFR7t.js";
async function saveUserToFirestore(userId, name, role) {
  try {
    await setDoc(
      doc(db, "users", userId),
      { name, role, updatedAt: Timestamp.now() },
      { merge: true }
    );
  } catch {
  }
}
async function getAllStudents() {
  try {
    const q = query(collection(db, "users"), where("role", "==", "student"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({
      id: d.id,
      name: String(d.data().name ?? ""),
      role: String(d.data().role ?? "student")
    }));
  } catch {
    return [];
  }
}
export {
  getAllStudents as g,
  saveUserToFirestore as s
};
