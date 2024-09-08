import firebase from '../../../../Firebase.js';

export const fetchLoansByStatus = (status) => {
    return new Promise((resolve, reject) => {
        const loansHistoryRef = firebase.database().ref("LoansHistoryInProgress");
        loansHistoryRef.orderByChild("status").equalTo(status).on("value", snapshot => {
            const loans = [];
            snapshot.forEach(childSnapshot => {
                const loan = childSnapshot.val();
                loan.id = childSnapshot.key;
                loans.push(loan);
            });
            resolve(loans);
        }, error => {
            reject(error);
        });
    });
};

export const addToCartHistoryPerUser = (productDetail, quantityRequested, userUID, formattedDateDevolution) => {
    return new Promise((resolve, reject) => {
        const loansHistoryRef = firebase.database().ref("LoansHistory");

        const currentDate = new Date();
        const formattedDate = `${currentDate
            .toISOString()
            .slice(0, 10)} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

        const newLoanRef = loansHistoryRef.push({
            fechaDevolucion: formattedDateDevolution,
            modelo: productDetail.modelo,
            nombre: productDetail.nombre,
            productID: productDetail.productID,
            cantidadSolicitada: quantityRequested,
            userUID: userUID,
            fechaPrestamo: formattedDate,
            estado: "APROBADO",
            loansHistoryID: null,
        });

        const loansHistoryID = newLoanRef.key;

        newLoanRef.update({
            loansHistoryID: loansHistoryID,
        })
            .then(() => {
                const productsRef = firebase.database().ref("Products");

                return productsRef.orderByChild("productID").equalTo(productDetail.productID).once("value");
            })
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const productNode = Object.keys(snapshot.val())[0];
                    const stock = parseInt(snapshot.val()[productNode].stock);
                    denyLoan(productDetail.id);
                    return firebase.database().ref(`Products/${productNode}`).update({
                        stock: (stock - quantityRequested).toString(),
                    });

                } else {
                    resolve(false);
                }
            })
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                console.error("Error al buscar el nodo:", error);
                resolve(false);
            });
    });
};

export const denyLoan = (loanId) => {
    return new Promise((resolve, reject) => {
        const loanRef = firebase.database().ref(`LoansHistoryInProgress/${loanId}`);
        loanRef.remove()
            .then(() => {
                console.log("Préstamo denegado y eliminado con éxito.");
                resolve(true);
            })
            .catch(error => {
                console.error("Error al eliminar el préstamo:", error);
                resolve(false);
            });
    });
};
