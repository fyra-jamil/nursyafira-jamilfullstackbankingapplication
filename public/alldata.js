function AllData(){
    const [data, setData] = React.useState('');    

    React.useEffect(() => {
        
        // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(JSON.stringify(data));                
            });

    }, []);
    var EmailSess = localStorage.getItem('EmailUser');
    if (EmailSess != null)
    {
    return (<>

     <Card
      bgcolor="success"
      header="All Data"
      body={data}
    />
    </>);
    }
    else
    {
      return(<>
      <h1>Please login!</h1></>)
    }
}