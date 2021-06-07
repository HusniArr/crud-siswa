const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const con = require('./db-connect');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 2021;
const router = express.Router();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());

app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'index.html'));
});

// page 404
// app.use((req,res)=>{
// 	res.status(404).sendFile('./404.html',{root:__dirname});
// });

app.get('/getSiswa',(req,res)=>{
	con.connect((err)=>{
		
		var sql = 'SELECT * FROM siswa';
		con.query(sql,(err,result,fields)=>{
			if(err) throw err;
			res.json(result);
		})
	})
})


app.post('/simpan',(req,res)=>{
	var data = {
		nis : req.body.nis,
		nm_siswa:req.body.nm_siswa,
		kelas:req.body.kelas,
		jurusan:req.body.jurusan
	}

	var sql = 'INSERT INTO siswa SET ?';
	con.query(sql,data,(err,result)=>{
	
		if(err){
			console.log(err);
			
		}
		res.sendStatus(200);
	})
	
})

app.put('/update/:nis',(req,res)=>{
	var nis = req.params.nis;
	var	nm_siswa = req.body.nm_siswa;
	var	kelas = req.body.kelas;
	var jurusan = req.body.jurusan;
	var sql = 'UPDATE siswa SET nm_siswa =?,kelas =?,jurusan =? WHERE nis =? ';
	con.query(sql,[nm_siswa,kelas,jurusan,nis],(err,result)=>{
	
		if(err){
			console.log(err);
			
		}else{
			res.json({redirect:'/',msg:"Berhasil diperbaharui."})
		}

		
	})
	
});

app.get('/hapus/:nis',(req,res)=>{
	var nis = req.params.nis,
	 	sql = "DELETE  FROM siswa  WHERE nis = "+nis; 	
	con.query(sql,(err,result)=>{
	
		if(err){
			console.log(err);
		}else{
			res.redirect('/');
			
		}

		
	})
	
});

app.delete('/del/:nis',(req,res)=>{
	var nis = req.params.nis,
	 	sql = "DELETE  FROM siswa  WHERE nis = "+nis; 	
	con.query(sql,(err,result)=>{
	
		if(err){
			console.log(err);
		}else{
			res.json({redirect:'/',msg:"Berhasil dihapus."})
			
		}

		
	})
	
});




app.listen(port,()=>console.log(`server running on port ${port}`));