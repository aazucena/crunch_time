import $ from 'jquery';

const modal = async(props) => {
  const beforeRender = async() => {

  }
  const afterRender = async() => {
    $(".modal").on('click', () => {
      $(".modal").remove()
      $('#nav-settings > .nav-submenu').remove()
    })
  }
  const render = async() => {
    beforeRender()
    let modal = (
      `<div class="modal">
        <div class="modal-box">
          <div class="modal-header">
            <div class="modal-title">${props?.title ?? "Title"}</div>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer"></div>
        </div>
      </div>`
    );
    $('body').prepend(modal)
    setTimeout(() => {
      afterRender()
    }, 400)
  }
  render()
};

export default modal;
