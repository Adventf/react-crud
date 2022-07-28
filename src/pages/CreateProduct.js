import { useState, useEffect } from "react";
import { db } from "../service/firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Product.css";

function App() {
  const [newCodeProduct, setNewCodeProduct] = useState("");
  const [newNamaProduct, setNewNamaProduct] = useState("");
  const [newDeskripsiProduct, setNewDeskripsiProduct] = useState("");
  const [newHargaProduct, setNewHargaProduct] = useState(0);
  const [newUOM, setNewUOM] = useState("");

  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");

  const createProduct = async () => {
    await addDoc(productsCollectionRef, { codeproduct: newCodeProduct, namaproduct: newNamaProduct, deskripsiproduct: newDeskripsiProduct, hargaproduct: Number(newHargaProduct), uom: newUOM });
    window.location.reload();
  };

  useEffect(() => {
    const getProduct = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProduct();
  }, []);

  return (
    <div className="appis container mt-3 d-flex justify-content-center">
      <Card className="card">
        <Card.Body>
          <Form>
            <h4 className="mb-4 text-center">Input Product</h4>
            <Form.Control
              className="mb-2"
              placeholder="Code Product"
              onChange={(event) => {
                setNewCodeProduct(event.target.value);
              }}
            />
            <Form.Control
              className="mb-2"
              placeholder="Nama Product"
              onChange={(event) => {
                setNewNamaProduct(event.target.value);
              }}
            />
            <Form.Control
              className="mb-2"
              placeholder="Deskripsi Product"
              onChange={(event) => {
                setNewDeskripsiProduct(event.target.value);
              }}
            />
            <Form.Control
              className="mb-2"
              type="number"
              placeholder="Harga Product ($)"
              onChange={(event) => {
                setNewHargaProduct(event.target.value);
              }}
            />
            <Form.Select
              defaultValue="SHEET"
              className="mb-2"
              placeholder="UOM"
              onChange={(event) => {
                setNewUOM(event.target.value);
              }}
            >
              <option>UOM</option>
              <option>SHEET</option>
              <option>ROLL</option>
              <option>PCS</option>
            </Form.Select>
            <div className="display-flex justify-content-center">
              <Button type="submit" className="submitis bg-warning" onClick={createProduct}>
                Submit
              </Button>
              <br />
              <a className="back" href="/">
                Back
              </a>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
