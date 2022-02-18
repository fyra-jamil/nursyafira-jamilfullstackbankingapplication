function Home(){
  return (
    <Card
      bgcolor="success"
      txtcolor="black"
      header="Fierra Banking System"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      body={(<img src="/public/image/WelcomHeader.png" className="img-fluid" alt="Responsive image"/>)}
    />
  );  
}
