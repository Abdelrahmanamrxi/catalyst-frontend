import { jwtDecode } from 'jwt-decode'
export function Logout(navigate){
    localStorage.removeItem('Token')
    navigate('/')
}
export const ScrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' }); 
};
export const fixImagePath = (path) => path.replace(/\\/g, '/');

export function DecodeJWT(token) {
    try {
      if (!token) {
        return null;
      }
      const base64Url = token.split('.')[1]; 
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);
    
      return decoded || null;  
    } catch (err) {
  console.log(err)
    }
  }
  export function CheckToken(token,navigate){
    try{
    if(!token) return false;
    
    else{
      const decoded=jwtDecode(token)
      const current_time=Date.now()/1000
    if(decoded.exp<current_time){
      Logout(navigate)
      return false;
    }
    else{
      return true;
    }
    }
  }
  catch(err){
    console.log('INVALID TOKEN',token)
    Logout(navigate)
    return false
  }

  }
  export const handleBack = (navigate) => {
    const path = location.state?.from ? `${location.state.from}${location.search || ''}` : -1;
    navigate(path);
  };
  