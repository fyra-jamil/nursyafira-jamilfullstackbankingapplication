function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
  <img src="/image/WithdrawMoneyHeader.png" className="img-fluid" alt="Responsive image"/>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  var EmailSess = localStorage.getItem('EmailUser')
  function handle(){
    if(parseInt(amount) < 0)
    {
      props.setStatus('Withdraw failed')
      console.log('err:', "Negative withdraw value");
    }
    else if(!Number.isInteger(parseInt("-" + amount)))
    {
      props.setStatus('Withdraw failed')
      console.log('err:', "Incorrect withdraw value");
    }
    else
    {
      fetch(`/account/update/${EmailSess}/-${amount}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              props.setStatus(JSON.stringify(data.value));
              props.setShow(false);
              const obj = JSON.parse(text, function (key, value) {
                if (key == "balance") {
                localStorage.setItem('BalanceUser',value);
                }
              });
              console.log('JSON:', data);
          } catch(err) {
              props.setStatus('Withdraw failed')
              console.log('err:', text);
          }
      });
    }
  }

  var EmailSess = localStorage.getItem('EmailUser');
  if (EmailSess != null)
  {
  return(<>
   <img src="/image/WithdrawMoneyHeader.png" className="img-fluid" alt="Responsive image"/>
   <h1>Hi {localStorage.getItem('EmailUser')}!</h1>
   <h2>Balance : ${localStorage.getItem('BalanceUser')}!</h2>
    <h5>Amount</h5>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
  }
  {
    return(<>
    <h1>Please login!</h1></>)
  }
}
