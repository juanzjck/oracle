const oracledb = require('oracledb');

//oracledb.initOracleClient({ libDir: process.env.DATA_KEY||'/usr/lib/oracle/21/client64/lib' });

oracledb.initOracleClient({ libDir: process.env.DATA_KEY||'/usr/lib/oracle/12.2/client64/lib' });

class Db {
    static instance=new Db();
    constructor(){
        this.connection;
       
    }

    start = async() =>{
        this.connection = await oracledb.getConnection({ user: "admin", password: "Gloria2023gloria", connectionString: "DB202106181516_high" })
        console.log('DB CONNECTED')
    }

    getPostById = async (id) =>{
      const sql = `select * from APEX_BLOG_JPSZ.table_post WHERE post_id=${id}`;
     
      
      const res = await this.connection.execute(sql);
      this.connection.commit(); 
      
      return res.rows;  
  
    }

    getAllPosts = async () =>{
     
     // const sql = "INSERT INTO ADBSNMP.table_wish (person_id,wish)  VALUES ("+id_person+",'"+wish+"')";
      const sql = "select * from APEX_BLOG_JPSZ.table_post";
     
      console.log(sql)
      const res = await this.connection.execute(sql);
      this.connection.commit(); 
      return res  
  
  }
  getCommentsByPostId = async (id) =>{
    const sql = `select * from APEX_BLOG_JPSZ.table_comments WHERE post_id=${id}`;
     
    const res = await this.connection.execute(sql);
    this.connection.commit(); 
    console.log(res)
    return res.rows
  }
  createNewCommentByIdPost= async (id,comment) =>{
    const sql = "INSERT INTO APEX_BLOG_JPSZ.table_comments (post_id, post_comment) VALUES ("+id+", '"+comment+"')"

    const res = await this.connection.execute(sql);
    this.connection.commit(); 
    console.log(res)
    return res  
  }




}




module.exports={
    Db
}
