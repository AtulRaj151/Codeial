{
       // method to submit form data to post using ajax

    let createPost = function() {

           let newPostForm = $('#new-post-form');

           newPostForm.submit(function(e){

                  e.preventDefault();

                  $.ajax({
                         type:'post',
                         url:'/posts/create',
                         data:newPostForm.serialize(),
                         success:function(data){

                            console.log(data.data.post.user.name);

                           let newPost = newPostDOM(data.data.post);
                           $('#posts-list-container>ul').prepend(newPost);
                           deletePost($(' .delete-post-button',newPost))
                         },error:function(err){

                             console.log(err.responseText);
                         }
                  });
           });
    }

//     method to create post in dom
let newPostDOM  =  function(post){
       return $(`<li id="post-${post._id}">
       <p>
  
          <small>
          <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
          </small>
   
      
          ${post.content}
          <br>
      
          <small>
          ${post.user.name}
          </small>
   
       </p>
   
       <div class="post-comments">
                  
                   <form action="/comment/create" method="POST">
                       <input type="text" name="content" placeholder="Type here to add comment...">
                       <input type="hidden" name="post" value="${post._id}">
                       <input type="submit" value="Add Comment">
                   </form>      
   
   
   
            
   
   
                  <div id="post-comment-list">
                       <ul id="post-comment-${post._id}">
                           
   
                 
   
                       </ul>
   
                  </div>
       </div>
    
      </li>`)
     } 


     //method for delete post from DOM

     let deletePost = function(deleteLink){

       $(deleteLink).click(function(e){

                e.preventDefault();
                $.ajax({

                     type:'get',
                     url:$(deleteLink).prop('href'),
                     success:function(data){

                            $(`#post-${data.data.post_id}`).remove();

                     },error:function(err){

                            console.log(err.responseText);
                     }
                })
       });
     }
   
    createPost();
}