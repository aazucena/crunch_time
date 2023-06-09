import unmute from '../assets/images/sound-max-svgrepo-com.svg'
import {Howler} from 'howler'
import $ from 'jquery';

const navbar = async(props) => {
  let unmute = `
  <svg id="unmute" viewBox="0 0 24 24" width="50" height="50" xmlns="http://www.w3.org/2000/svg">
    <path id="unmute-speaker"
      d=\"M3.13868 13.8978C2.4378 12.7296 2.4378 11.2703 3.13868 10.1022C3.36728 9.72119 3.75538 9.46349 4.19522 9.40066L6.52622 9.06766C6.82769 9.02459 7.09655 8.85515 7.26548 8.60176L7.63257 8.05112C7.92332 7.61499 8.0687 7.39693 8.23036 7.20088C8.80072 6.50919 9.54657 5.98357 10.3898 5.67908C10.6288 5.59277 10.8831 5.52921 11.3916 5.40208L12.0046 5.24882C12.3447 5.1638 12.5147 5.12129 12.6486 5.16295C12.7648 5.19912 12.8638 5.27645 12.9271 5.38042C13 5.50017 13 5.67545 13 6.026V17.974C13 18.3245 13 18.4998 12.9271 18.6195C12.8638 18.7235 12.7648 18.8008 12.6486 18.837C12.5147 18.8787 12.3447 18.8361 12.0046 18.7511L11.3916 18.5979C10.8831 18.4707 10.6288 18.4072 10.3898 18.3209C9.54657 18.0164 8.80072 17.4908 8.23036 16.7991C8.0687 16.603 7.92332 16.385 7.63257 15.9488L7.26548 15.3982C7.09655 15.1448 6.82769 14.9754 6.52621 14.9323L4.19522 14.5993C3.75538 14.5365 3.36728 14.2788 3.13868 13.8978Z"/>
    <path id="unmute-wave-1" fill-rule="evenodd" clip-rule="evenodd"
      d=\"M15.0052 7.93411C15.2981 7.64122 15.773 7.64122 16.0659 7.93411C17.1386 9.0069 17.744 10.4602 17.75 11.9773C17.7559 13.4945 17.1621 14.9525 16.0978 16.0337C15.8072 16.3289 15.3323 16.3326 15.0371 16.042C14.742 15.7515 14.7382 15.2766 15.0288 14.9814C15.8154 14.1823 16.2544 13.1046 16.25 11.9832C16.2456 10.8619 15.7981 9.7877 15.0052 8.99477C14.7123 8.70188 14.7123 8.227 15.0052 7.93411Z"/>
    <path id="unmute-wave-2" fill-rule="evenodd" clip-rule="evenodd"
      d=\"M18.1265 5.81279C18.4194 5.5199 18.8943 5.5199 19.1872 5.81279C20.8197 7.44529 21.7408 9.65682 21.7499 11.9655C21.759 14.2742 20.8553 16.4929 19.2357 18.1382C18.9452 18.4334 18.4703 18.4372 18.1751 18.1466C17.8799 17.856 17.8762 17.3811 18.1668 17.0859C19.5087 15.7227 20.2575 13.8843 20.2499 11.9714C20.2424 10.0585 19.4792 8.22609 18.1265 6.87345C17.8336 6.58056 17.8336 6.10568 18.1265 5.81279Z"/>
  </svg>`

  let mute = `<?xml version="1.0" encoding="utf-8"?>
  <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
  <svg id="mute" width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path id="mute-speaker"
      d=\"M3.13867 13.8978C2.43779 12.7297 2.43779 11.2704 3.13867 10.1022C3.36726 9.72125 3.75537 9.46355 4.19521 9.40072L6.5262 9.06772C6.82768 9.02465 7.09654 8.85521 7.26546 8.60182L7.63256 8.05118C7.9233 7.61507 8.06869 7.39699 8.23034 7.20094C8.80071 6.50925 9.54656 5.98363 10.3898 5.67914C10.6288 5.59284 10.883 5.52927 11.3915 5.40215L12.0046 5.24888C12.3447 5.16386 12.5147 5.12135 12.6486 5.16301C12.7648 5.19919 12.8638 5.27651 12.9271 5.38048C13 5.50024 13 5.67551 13 6.02606V17.974C13 18.3246 13 18.4998 12.9271 18.6196C12.8638 18.7236 12.7648 18.8009 12.6486 18.8371C12.5147 18.8787 12.3447 18.8362 12.0046 18.7512L11.3915 18.5979C10.883 18.4708 10.6288 18.4072 10.3898 18.3209C9.54656 18.0164 8.80071 17.4908 8.23034 16.7991C8.06868 16.6031 7.92331 16.385 7.63256 15.9489L7.26546 15.3983C7.09654 15.1449 6.82768 14.9754 6.5262 14.9324L4.19521 14.5994C3.75537 14.5365 3.36726 14.2788 3.13867 13.8978Z"/>
    <path id="mute-cross"
      d=\"M20.7071 9.29293C21.0976 9.68345 21.0976 10.3166 20.7071 10.7071L19.4142 12L20.7071 13.2929C21.0976 13.6835 21.0976 14.3166 20.7071 14.7071C20.3166 15.0977 19.6834 15.0977 19.2929 14.7071L18 13.4142L16.7071 14.7071C16.3166 15.0977 15.6834 15.0977 15.2929 14.7071C14.9024 14.3166 14.9024 13.6835 15.2929 13.2929L16.5858 12L15.2929 10.7071C14.9024 10.3166 14.9024 9.68345 15.2929 9.29293C15.6834 8.90241 16.3166 8.90241 16.7071 9.29293L18 10.5858L19.2929 9.29293C19.6834 8.90241 20.3166 8.90241 20.7071 9.29293Z"/>
  </svg>`

  let setting_menu= `
  <div class="nav-submenu" id="settings-menu">
    <div class="nav-subitem" id="credits">
      Credits
    </div>
  </div>`

  let soundStatus = () => {
    let fill = $('#nav-sound > svg path').css('fill')
    let sound = $('#nav-sound > svg')
    if (sound.attr("id") === "mute") {
      Howler.mute = false
      $('#nav-sound').html(unmute)
      $('#nav-sound > svg path').css('fill', fill)
    } else {
      Howler.mute = true
      $('#nav-sound').html(mute)
      $('#nav-sound > svg path').css('fill', fill)
    }
  }
  const beforeRender = async() => {

  }
  const afterRender = async() => {
    $('#nav-sound').on('click', () => {
      soundStatus()
    })
    $('#nav-settings > svg').on('click', () => {
      if ($('#nav-settings > .nav-submenu').length) {
        $('#nav-settings > .nav-submenu').remove()
      } else {
        
        $('#nav-settings > #settings').after(setting_menu)
        $('#settings-menu > .nav-subitem').on('click', async(event) => {
          let id = event.target.id
          switch(id) {
            case "credits":
              let modal = (await import('./modal.js')).default
              let content = (
                `<div class="description">
                  <span class="description-title">Description</span>
                  <div class="description-body">
                    The nature of our interactive experience is about the stress students feel as they struggle with time management at school. We want participants to either learn or remember how difficult it can be for students to have a good work-life balance and find the ability to take care of their health. To express this, it would be most effective to do so in a physically demanding way where the participant must use both their mind and body at the same time.
                  </div>
                </div>
                <div class="list">
                  <span class="list-heading">Images/SVGs</span>
                  <div class="list-menu">
                    <div class="list-item">Arrow SVG</div>
                    <div class="list-item">Settings SVG</div>
                  </div>
                  </div>
                <div class="list">
                  <span class="list-heading">Music</span>
                  <div class="list-menu">
                    <div class="list-item">Air Raid</div>
                    <div class="list-item">Baby Lullaby</div>
                    <div class="list-item">Outlast - Dr. Rick Trager Theme</div>
                    <div class="list-item">Metal Gear Solid 1</div>
                    <div class="list-item">Resident Evil 2 Remake - Mr. X Theme</div>
                    <div class="list-item">Reveille</div>
                    <div class="list-item">Persona 5 - Run Run Run!</div>
                    <div class="list-item">Sad Trombone</div>
                    <div class="list-item">Spongebob - Grass Skirt Chase</div>
                    <div class="list-item">Spongebob - 12th Street Rag</div>
                    <div class="list-item">Super Mario 64 - SLider</div>
                    <div class="list-item">Undertale - Run!</div>
                    <div class="list-item">Left 4 Dead - Witch Theme</div>
                    <div class="list-item">Yakety Sax</div>
                  </div>
                </div>`
              )
              modal({ title: 'Credits', content  })
              break
            default:
              break
          }
        })
      }
    })
    // $('#nav-settings > svg').on('blur', () => {
    //   $('#nav-settings > .nav-submenu').remove()
    // })
    
  }
  const render = async() => {
    beforeRender()
    let page = `
    <div class="navbar">
        <div class="navbar-logo"></div>
        <div class="navbar-menu">
          <div class="navbar-item" id="nav-settings">
            <svg id="settings" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" height="30">
              <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path id="gear"
                d=\"M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
            </svg>
          </div>
        </div>
    </div>`
    $('#nav').html(page)
    setTimeout(() => {
      afterRender()
    }, 400)
  }
  render()
}
export default navbar