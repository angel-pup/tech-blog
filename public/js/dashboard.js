document.addEventListener('DOMContentLoaded', () => {

  const $newBlogSubject = document.getElementById('subject');
  const $newBlogBody = document.getElementById('body');
  const $newBlogModal = document.getElementById('new-blog-modal');

  const user_id = document.getElementById('save').dataset.target;
  

    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    (document.querySelectorAll('.modal-background, .cancel-edit') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
      const $subject = document.getElementById(`${$target.id}`).querySelector('.subject-edit');
      const $body = document.getElementById($target.id).querySelector('.body-edit');

      $close.addEventListener('click', () => {
        closeModal($target);
        $subject.value = $subject.dataset.target;
        $body.value = $body.dataset.target;
      });
    });

    (document.querySelectorAll('.save-edit') || []).forEach(($close) => {
      const blog_id = $close.dataset.target;
      const $target = $close.closest('.modal');
      const $subject = document.getElementById(`${$target.id}`).querySelector('.subject-edit');
      const $body = document.getElementById($target.id).querySelector('.body-edit');

      $close.addEventListener('click', async () => {

        const subject = $subject.value;
        const body = $body.value;

        if(!subject || !body) {
          alert('Both subject and body must be provided');
        } else {
          const response = await fetch(`/api/blogs/${blog_id}`, {
            method: 'PUT',
            body: JSON.stringify({
              subject,
              body
            }),
            headers: { 'Content-Type': 'application/json' }
          });
    
          if(response.ok) {
            console.log(response.ok);
          } else {
            alert(`Internal Server Error: Blogpost update unsuccesful.\nReloading page.`);
            console.error(response.error);
          }

          closeModal($target);
          location.reload();
        }
      });
    });

    (document.querySelectorAll('.delete-blog') || []).forEach(($close) => {
      const blog_id = $close.closest('.delete-blog').dataset.target;

      $close.addEventListener('click', async () => {
        const response = await fetch(`/api/blogs/${blog_id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        })
  
        if(response.ok) {
          console.log(response.ok);
        } else {
          alert(`Internal Server Error: Blogpost deletion unsuccesful.\nReloading page.`);
          console.error(response.error);
        }
  
        location.reload();
      });
    });

    // (document.querySelectorAll('.modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    //   const $target = $close.closest('.modal');
    //   const originalSubject = $close.closest('.subject-edit').value;
    //   const originalBody = $close.closest('.body-edit').value;
      
    //   $close.addEventListener('click', () => {
    //     closeModal($target);
    //   });
    // });
  
    // TODO: Add a keyboard event to close all modals (need to restructure to implement cancel data requery)
    // document.addEventListener('keydown', (event) => {
    //   const e = event || window.event;
  
    //   if (e.keyCode === 27) { // Escape key
    //     closeAllModals();
    //   }
    // });

    document.querySelector('#cancel').addEventListener('click', () => {
      $newBlogBody.value = '';
      $newBlogSubject.value = '';

      closeModal($newBlogModal);
    });


    document.querySelector('#save').addEventListener('click', async () => {    
      const subject = $newBlogSubject.value;
      const body = $newBlogBody.value;
      
      if (!subject || !body) {
        alert('Both subject and body must be provided');
      } else {
        const response = await fetch('/api/blogs', {
          method: 'POST',
          body: JSON.stringify({
            subject,
            body,
            user_id
          }),
          headers: { 'Content-Type': 'application/json' }
        })

        if(response.ok) {
          console.log(response.ok);
        } else {
          alert(`Internal Server Error: Blogpost creation unsuccesful.\nReloading page.`);
          console.error(response.error);
        }

        location.reload();
      }
    })

  });