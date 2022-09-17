import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { authContext, firebaseContext } from '../../Context';
import {ref, uploadBytes,listAll, list, getDownloadURL} from 'firebase/storage'
import { v4 } from 'uuid';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import {db} from '../../firebase'
import { useNavigate } from 'react-router';


const Create = () => {

  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [category,setCatogory] =useState('');
  const [prize ,setPrize] = useState(null);
  const [image,setImage] = useState(null)
  const [imageList , setImageList] = useState([])

  const {storage} = useContext(firebaseContext)
  const {userId} =useContext(authContext)
  
  let date = new Date()

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = date.getFullYear();

  date = mm + '/' + dd + '/' + yyyy;
  

  const handleSubmit = (e) =>{ 
    e.preventDefault();
    
    console.log(storage);
    const imageRef = ref(storage,`images/${image.name + v4()}`);
    uploadBytes(imageRef , image).then((snapshot)=>{
      console.log('image uploaded!')
      getDownloadURL(snapshot.ref).then((url)=>{
        console.log(url);
        setImageList((prev)=> [...prev ,url])
        addDoc(collection(db, 'products'),{
          name ,
          category , 
          prize ,
          url,
          userId,
          created : date
        }).then((res)=>{
          console.log('datas added')
        }).catch((error)=>{
          console.log(error.message)
        })
      }).then(()=>{
        navigate('/')
      })

    })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>setCatogory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={prize}
              onChange={(e)=>setPrize(e.target.value)} />
            <br />
          </form>
          <br />
          <img alt="Posts"  height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <form>
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
