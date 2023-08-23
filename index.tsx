import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login';
import Signup from './Signup';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function App() {
  const [receivedData, setReceivedData] = useState<any[]>([]);
  const [receivedData1, setReceivedData1] = useState<any[]>([]);

  const handleDataFromChild = (data: any) => {
    setReceivedData(data);
  };

  const handleDataFromChild1 = (data1: any) => {
    setReceivedData1(data1);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login onDataFromChild={handleDataFromChild1} data={receivedData} />} />
        <Route path="/Signup" element={<Signup onDataFromChild={handleDataFromChild} />} />
        <Route path="/PostList" element={<PostList data1={receivedData1} />} />
      </Routes>
    </div>
  );
}

function PostList({ data1 }: any) {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setselectedPost] = useState<any>(null);
  const [inputval, setinputval] = useState<any>(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [addcomment, setaddcomment] = useState('');
  const [commentpost, setcommentpost] = useState<any>(false);
  const [viewcomment, setviewcomment] = useState<any>(false);
  const [showcomment, setshowcomment] = useState<any>(true);
  const [newpost, setnewpost] = useState<any>(false);
  const [editcomment, seteditcomment] = useState<any>(true);
  const [commenttitle, setcommentTitle] = useState('');
  const [commentbody, setcommentBody] = useState('');
  const [commentid, setcommentid] = useState('');
  const [PostID, setPostID] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const fetchComments = (post: any, comment: any) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post}/comments`)
      .then(response => response.json())
      .then(data => setComments([...data, ...comment]))
      .catch(error => console.error('Error fetching comments:', error));
    setshowcomment(false);
    setviewcomment(true);
  };

  const handleAddComment = (post: any, comment: any, data: any) => {
    const newComment = {
      postId: post,
      id: comments.length + 1,
      name: data1.username,
      email: "user1@yahoo.com",
      body: comment
    };
    setComments([...comments, newComment]);
    setcommentpost(false);
  };


  const edit = (post: any) => {
    if (data1.userId === post.userId) {
      setinputval(true);
      setselectedPost(post);
      setTitle(post.title);
      setBody(post.body);
    }
    else {
      alert("You are not Allowed to edit this Post");
    }
  }

  const editcontent = (event: any) => {
    setcommentBody(event.target.value);
  }

  const edittitle = (event: any) => {
    setcommentTitle(event.target.value);
  }

  const editcontent1 = (event: any) => {
    setBody(event.target.value);
  }

  const edittitle1 = (event: any) => {
    setTitle(event.target.value);
  }

  const handleupdate = (body: any, title: any, selectedPost: any) => {
    const updatedItems = posts.map(item => {
      if (item.id === selectedPost.id) {
        return { ...item, title, body };
      }
      return item;
    });

    setPosts(updatedItems);
    setinputval(false);
  }

  const handleDelete = (postId: any,postuserId :any) => {
    if (data1.userId == postuserId) {
      const updatedPosts = posts.filter(posti =>
        posti.id !== postId
        );

      setPosts(updatedPosts);
    }
    else {
      alert("You are Not Allowed to Delete this Post");
    }
  };

  const handlepost = (title: any, body: any, data1: any) => {
    const newPost = {
      userId: data1.id,
      id: posts.length + 1,
      title: title,
      body: body,
    };

    setPosts([...posts, newPost]);
    setnewpost(false);
  }

  const editComment = (comment: any) => {
    if(data1.userId === comment.postId)
    {
    setcommentTitle(comment.name);
    setcommentBody(comment.body);
    setcommentid(comment.id);
    seteditcomment(false);
    }
    else{
      alert("You are Not Allowed to Edit this Comment");
    }
  }

  const addnewcomment = (post: any) => {
    setPostID(post);
    setcommentpost(true);
  }

  const handleDeleteComment = (comment: any) => {
    if(data1.userId === comment.postId)
    {
    const delComment = comments.filter((comments1) => comments1.id !== comment.id);
    setComments(delComment);
    }
    else
    {
      alert("You are Not Allowed to Delete this Comment");
    }
  }

  const handleupdateComment = (body: any, name: any, comment: any) => {
    const UpdatedComment = comments.map(element => {
      if (element.id === comment) {
        return { ...element, name, body };
      }
      return element;
    });

    setComments(UpdatedComment);
    seteditcomment(true);
  }

  return (
    <>
      <div className='heading'>
        <div className='heading1'><p>Posts</p>
          <p><button onClick={() => setnewpost(true)} className='post'>Create a New Post</button></p></div>
      </div>
      {newpost ? (
        <div className='mainpost1'>
          <div className="update">
            <p>Title</p>
            <br />
            <input
              type="text"
              value={title}
              onChange={edittitle}
            />
            <br /><p>Content</p>
            <br />
            <textarea
              value={body}
              onChange={editcontent}
            />
            <br />
            <p>
              <button onClick={() => setnewpost(false)}>Cancel</button>
              <button onClick={() => handlepost(body, title, data1)}>Post</button>
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
      {!commentpost ? (
        showcomment ? (
          !inputval ? (
            posts.map((post) => (
              <div className='mainpost'>
                <div className='black'>
                  <p key={post.id}>Title <br />{post.title}
                    <br />Content <br />{post.body}</p>
                  <div className='postsettings'>
                    <button onClick={() => fetchComments(post.id, comments)}>View Comments</button>
                    <button onClick={() => addnewcomment(post.userId)}>Add a new Comment</button>
                    <button onClick={() => edit(post)}>Edit</button>
                    <button onClick={() => handleDelete(post.id,post.userId)}>Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (selectedPost && (
            <div className='mainpost1'>
              <div className="update">
                <p>Title</p>
                <br />
                <input
                  type="text"
                  value={title}
                  onChange={edittitle1}
                />
                <br /><p>Content</p>
                <br />
                <textarea
                  value={body}
                  onChange={editcontent1}
                />
                <br />
                <p>
                  <button onClick={() => setinputval(false)}>Cancel</button>
                  <button onClick={() => handleupdate(body, title, selectedPost)}>Update</button>
                </p>
              </div>
            </div>
          )
          )
        ) : (
          viewcomment ? (
            <p>
              <>
                <button onClick={() => setshowcomment(true)}>Close</button>
                <h2>Comments</h2>
                {editcomment ? (
                  comments.map((comment: any) => (
                    <div className="black1">
                      <>
                        <h3>{comment.name}</h3>
                        <p>{comment.body}</p>
                        <button onClick={() => editComment(comment)}>Edit</button>
                        <button onClick={() => handleDeleteComment(comment)}>Delete</button>
                      </>
                    </div>
                  ))
                ) : (
                  <div className='mainpost1'>
                    <div className="update">
                      <p>Title</p>
                      <br />
                      <input
                        type="text"
                        value={commenttitle}
                        onChange={edittitle}
                      />
                      <br /><p>Content</p>
                      <br />
                      <textarea
                        value={commentbody}
                        onChange={editcontent}
                      />
                      <br />
                      <p>
                        <button onClick={() => setinputval(false)}>Cancel</button>
                        <button onClick={() => handleupdateComment(commentbody, commenttitle, commentid)}>Update</button>
                      </p>
                    </div>
                  </div>
                )}
              </>
            </p>
          ) : (
            <> </>
          )
        )) : (
        <div className='addComment'>
          <textarea value={addcomment} onChange={(e) => setaddcomment(e.target.value)} />
          <button onClick={() => handleAddComment(PostID, addcomment, data1)}>Post</button>
        </div>
      )}
    </>
  );
}



root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

export default App;