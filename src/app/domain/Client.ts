export interface Client{
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  password: string;
  role: string;
  // role: "User" | "Auteur";
}
