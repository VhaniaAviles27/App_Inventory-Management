import firebase from '../../Firebase';

export const addToCartFirebaseInProgress = (productDetail, quantityRequested, userUID, nombre, formattedDateDevolution) => {
  return new Promise((resolve, reject) => {
    const loansHistoryRef = firebase.database().ref("LoansHistoryInProgress");

    const currentDate = new Date();
    const formattedDate = `${currentDate
      .toISOString()
      .slice(0, 10)} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
  
    const newLoanRef = loansHistoryRef.push({
      modelo: productDetail.modelo,
      nombre: productDetail.nombre,
      productID: productDetail.productID,
      cantidadSolicitada: quantityRequested,
      userUID: userUID,
      fechaPrestamo: formattedDate,
      fechaDevolucion: formattedDateDevolution,
      loansHistoryID: null,
      status: "PENDIENTE",
      nombreSolicitante: nombre,
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

