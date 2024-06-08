import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Configuración de Firebase de tu aplicación web
const firebaseConfig = {
    apiKey: "AIzaSyD5Zp018M5H9zAZmrD-8_O5lzEDLApGY1I",
    authDomain: "registro-torneo.firebaseapp.com",
    projectId: "registro-torneo",
    storageBucket: "registro-torneo.appspot.com",
    messagingSenderId: "903575245780",
    appId: "1:903575245780:web:04ec7e72a5fa01aa5cbc41"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Manejar el formulario de registro
document.getElementById('registroForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Verificar si hay 32 personas registradas
    const personasSnapshot = await getDocs(collection(db, "personas"));
    if (personasSnapshot.size >= 32) {
        alert("¡Cupo lleno! Ya hay 32 personas registradas.");
        return;
    }

    const nombre = document.getElementById('nombre').value;
    const grupo = document.getElementById('grupo').value;
    const celular = document.getElementById('celular').value;

    try {
        // Registrar en la colección "personas"
        await addDoc(collection(db, "personas"), {
            nombre: nombre,
            grupo: grupo,
            celular: celular
        });
        alert("Registro exitoso");
        document.getElementById('registroForm').reset();
    } catch (error) {
        console.error("Error al registrar: ", error);
    }

    // Verificar si hay que registrar en la lista de espera
    if (personasSnapshot.size >= 32) {
        try {
            // Registrar en la colección "lista de espera"
            await addDoc(collection(db, "listaDeEspera"), {
                nombre: nombre,
                grupo: grupo,
                celular: celular
            });
            alert("¡Cupo lleno! Estás registrado en la lista de espera.");
            document.getElementById('registroForm').reset();
        } catch (error) {
            console.error("Error al registrar en la lista de espera: ", error);
        }
    }
});
