import "@progress/kendo-theme-default/dist/all.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Component {...pageProps} />
      <style jsx global>{`
        .container {
          height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

export default MyApp;
