import firebase from '../../Firebase';

export const addToCartFirebaseInProgress = (productDetail, quantityRequested, userUID, name, lastname) => {
  return new Promise((resolve, reject) => {
    const loansHistoryRef = firebase.database().ref("LoansHistoryInProgress");

    const currentDate = new Date();
    const formattedDate = `${currentDate
      .toISOString()
      .slice(0, 10)} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

    const newLoanRef = loansHistoryRef.push({
      categoria: productDetail.categoria,
      foto: productDetail.foto,
      marca: productDetail.marca,
      modelo: productDetail.modelo,
      nombre: productDetail.nombre,
      productID: productDetail.productID,
      cantidadSolicitada: quantityRequested,
      userUID: userUID,
      fechaPrestamo: formattedDate,
      loansHistoryID: null,
      status: "PENDIENTE",
      nombreSolicitante: name,
      apellidoSolicitante: lastname,
    });

    const loansHistoryID = newLoanRef.key;

    newLoanRef.update({
      loansHistoryID: loansHistoryID,
    })
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        resolve(false);
      });
  });
};

