document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
    
    (document.querySelectorAll('.submit-comment') || []).forEach(($trigger) => {
      const $target = $trigger.closest('.modal');
      
      $trigger.addEventListener('click', async () =>  {
        const message = document.getElementById(`${$target.id}`).querySelector('.comment-add').value;
        const blog_id = $target.id;
        const user_id = document.querySelector('.me').id;

        if (message === '') {
          alert('Message cannot be empty');
          return;
        }

        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            message,
            blog_id,
            user_id
          }),
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          console.log(response.ok)
        } else {
          alert('Internal Server Error: Comment creation unsuccesful.\nReloading page.');
          console.error(response.error);
        }

        location.reload();

      });
    });

    // document.querySelector('#save').addEventListener('click', async () => {    
    //   const subject = $newBlogSubject.value;
    //   const body = $newBlogBody.value;
      
    //   if (!subject || !body) {
    //     alert('Both subject and body must be provided');
    //   } else {
    //     const response = await fetch('/api/blogs', {
    //       method: 'POST',
    //       body: JSON.stringify({
      //         subject,
      //         body,
      //         user_id
      //       }),
      //       headers: { 'Content-Type': 'application/json' }
      //     })
      
      //     if(response.ok) {
        //       console.log(response.ok);
        //     } else {
          //       alert(`Internal Server Error: Blogpost creation unsuccesful.\nReloading page.`);
          //       console.error(response.error);
          //     }
          
          //     location.reload();
          //   }
          // })
          
      // Add a click event on buttons to open a specific modal
      (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);
        
        $trigger.addEventListener('click', () => {
          openModal($target);
          $target.querySelector('.modal-card-body').scrollTo({
            top: 0
          });
        });
      });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
        $target.querySelector('textarea').value = '';
      });
    });
  });