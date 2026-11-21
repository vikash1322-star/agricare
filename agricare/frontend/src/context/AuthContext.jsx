
import React ,{createContext,useContext,useState} from 'react';
import api from '../api';
const AuthContext=createContext(null);
export function AuthProvider({children}){const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem('agricare_user'))}catch{return null}});
const login=async(email,password)=>{const {data}=await api.post('/auth/login',{email,password});localStorage.setItem('agricare_token',data.token);localStorage.setItem('agricare_user',JSON.stringify(data.user));setUser(data.user);return data.user;};
const register=async(form)=>{const {data}=await api.post('/auth/register',form);return data;};
const logout=()=>{localStorage.removeItem('agricare_token');localStorage.removeItem('agricare_user');setUser(null);};
return <AuthContext.Provider value={{user,login,register,logout}}>{children}</AuthContext.Provider>}
export const useAuth=()=>useContext(AuthContext);
