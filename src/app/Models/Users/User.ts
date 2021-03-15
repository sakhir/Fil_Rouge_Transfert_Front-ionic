import { Profils } from "../Profil/Profil";

export  class User {
    id?:number;
    email: string;
    password:string;
    prenom :string;
    nom:string ;
    avatar:any; 
    IsDeleted: number;
    IsConnect:number;
    profil:Profils;



   constructor(profil:Profils, id :number ,email:string  , password: string ,prenom :string ,nom :string , avatar :any,IsDeleted:number ,IsConnect:number ) {
        this.id=id;
        this.email=email;
        this.password=password;
        this.prenom=prenom;
        this.nom=nom;
        this.avatar=avatar;
        this.IsDeleted=IsDeleted;
        this.IsConnect=IsConnect;
        this.profil=profil;
       
   }

}
