import { useRouteError } from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"  

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
    <Header/>
    <main className="container py-5 text-center" id="error-page">
        <h1 className="display-5 fw-bolder mb-5"> Oops! </h1>
    <p className="text-center mb-5">Sorry, an unexpected error has occurred.</p>
    <p className="small text-danger"> <i>{error.statusText || error.message}</i></p>
    </main>
    <Footer/>
    </>
  );
}