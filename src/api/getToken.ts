import useUser from '@hooks/useUser.ts';

export class TokenService {
  
  private fetchToken():string  {
    const user = useUser();
    const token:string| undefined = user.getAccessToken() ;
    if(!token){
      console.error("No user token found")
      return ""
    }else{
      return token
    }
    
  }

  public getToken(): string  {
    return this.fetchToken();
  }
}
