import { firestore } from 'firebase'

class Firestore {
  crearBitacora (name, valorInicial, userID) {
    const fecha = this.getFecha()
    return firestore().collection('Bitacoras').add({
      name,
      valorInicial,
      valorActual: valorInicial,
      variacion: 0,
      userID,
      fecha
    })
  }

  crearEntrada (trades, notas, imagenes, bitacoraID) {
    const fecha = this.getFecha()
    return firestore().collection('Entradas').add({ trades, notas, imagenes, bitacoraID, fecha })
  }

  update (collection, id, data) {
    return firestore().collection(collection).doc(id).update(data)
  }

  get (collection) {
    return firestore().collection(collection)
  }

  delete (collection, ID) {
    return firestore().collection(collection).doc(ID).delete()
  }

  getFecha () {
    const date = new Date()
    const hora = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    const minutos = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const mes = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    const dia = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
    return `${mes}/${dia}/${date.getFullYear()} - ${hora}:${minutos}`
  }
}

export default Firestore
