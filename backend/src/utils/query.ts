import pool from "../db";


export const query = async (
  text: string,
  params?: any[]
) => pool.query(text, params); 
