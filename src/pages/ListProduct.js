import { useState, useEffect } from "react";
import { db } from "../service/firebase-config";
import { collection, getDocs, getDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import swal from "sweetalert";

export default function CreateProduct() {
  const updateProduct = async (id, hargaproduct) => {
    const productDoc = doc(db, "products", id);
    const newFields = { hargaproduct: hargaproduct + 1 };
    await updateDoc(productDoc, newFields);
    window.location.reload();
  };
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
  };

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  }, []);

  const modal = async (id) => {
    const productDoc = doc(db, "products", id);
    const data = await getDoc(productDoc);
    console.log("data id " + data.id);
    swal({
      title: "Are you sure want delete this product?",
      text: `Nama Product : ${data.id} `,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        window.location.reload();
      } else {
        swal("Your Product file is safe!");
      }
    });
  };

  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard v1</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {products.map((product) => {
                return (
                  <div className="col-lg-3 col-6">
                    <div className="small-box bg-success">
                      <div className="inner">
                        <h4 className="title text-center">{product.namaproduct}</h4>
                        <p>Code : {product.codeproduct}</p>
                        <p>Deskripsi : {product.deskripsiproduct}</p>
                        <p>Harga : $ {product.hargaproduct}</p>
                        <p>UOM : {product.uom}</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-bag" />
                      </div>
                      <a
                        href="#"
                        className="small-box-footer"
                        onClick={() => {
                          modal(product.namaproduct, deleteProduct(product.id));
                        }}
                      >
                        Delete Product
                      </a>
                      <a
                        href="#"
                        className="small-box-footer"
                        onClick={() => {
                          updateProduct(product.id, product.hargaproduct);
                        }}
                      >
                        Increase Price <i className="fas fa-arrow-circle-up" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
