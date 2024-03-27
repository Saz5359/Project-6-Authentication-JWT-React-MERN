function NoPage() {
  return (
    /* This is displayed when the user enter an unknown url*/
    <div className="error">
      <div>
        <h2 className="error-face">
          <box-icon
            type="solid"
            name="error"
            size="lg"
            color="#ffffff"
          ></box-icon>
        </h2>
        <h2>Page Not Found</h2>
      </div>
    </div>
  );
}

export default NoPage;
