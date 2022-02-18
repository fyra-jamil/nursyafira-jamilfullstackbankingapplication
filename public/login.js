const firebaseConfig = {

  apiKey: "AIzaSyAj-VVCeZZ1jYopwSdn_2xbVrccIV4VFDk",
  authDomain: "testing-39874.firebaseapp.com",
  databaseURL: "https://testing-39874.firebaseio.com",
  projectId: "testing-39874",
  storageBucket: "testing-39874.appspot.com",
  messagingSenderId: "115697365256",
  appId: "1:115697365256:web:f77f61de2bb084b1b53cbd"
};







function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  

 
  
  return (
    <Card
      bgcolor="success"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

   // Initialize Firebase
   if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  // get elements
const fbemail = document.getElementById("email");
const fbpassword = document.getElementById("password");
const login = document.getElementById("login");
const signup = document.getElementById("signup");
const logout = document.getElementById("logout");
const loggedInStatus = document.getElementById("loggedInStatus");
const googlelogin = document.getElementById("googlelogin");

function IsJsonString(str) {
  try {
      var obj = JSON.parse(str);

  } catch (e) {
      return false;
  }
  return true;
}

//Google Login
function googleLoginss(){

  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {

    fetch(`/account/findOne/${result.user.email}`)
    .then(response => response.text())
    .then(text => {
        try {
          const trialpass = '12345'
          fetch(`/account/login/${result.user.email}/${trialpass}`)
          .then(response => response.text())
          .then(text => {
                  if(IsJsonString(text) == true)
                  {
                  const data = JSON.parse(text);
                  console.log(text);
                  localStorage.setItem('EmailUser',result.user.email);
                  localStorage.setItem('NameUser',result.user.email);
                  const obj2 = JSON.parse(text, function (key, value) {
                    if (key == "balance") {
                     localStorage.setItem('BalanceUser',value);
                    }
                  });
                  
                  window.location.replace("/");
                  }
                  else
                  {
                    const trialpass = '12345'
                    const url = `/account/create/${result.user.email}/${result.user.email}/${trialpass}`;
                    (async () => {
                        var res  = await fetch(url);
                        var data = await res.json();           
                    })();
                    localStorage.setItem('EmailUser',result.user.email);
                    localStorage.setItem('BalanceUser',0);
                    localStorage.setItem('NameUser',result.user.email);
                    
                  window.location.replace("/");
                  }
                  console.log('JSON:', data);
                
                });
        } catch(err) {
          console.log('err:', text);
        }
    });
     
    })
    .catch(function (error) {
      console.log(error.code);
      console.log(error.message);
    });
}



  function handle(){
    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            localStorage.setItem('EmailUser',email);
            const obj = JSON.parse(text, function (key, value) {
              if (key == "balance") {
               localStorage.setItem('BalanceUser',value);
              }
            });
            const obj2 = JSON.parse(text, function (key, value) {
              if (key == "name") {
               localStorage.setItem('NameUser',value);
              }
            });
            console.log('JSON:', data);
            window.location.replace("/");
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }


  return (<> 
    <img src="/image/WelcomeHeader.png" className="img-fluid" alt="Responsive image"/>     
    <br/>
    <br/>
    <h5>Email Address</h5>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <h5>Password</h5>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button> <br/>
    
    <button  type="submit" className="btn btn-light" onClick={googleLoginss}>Google Login</button>
   
  </>);
}