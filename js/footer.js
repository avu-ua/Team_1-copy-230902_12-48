
// const url = window.location.href

// const domain = (new URL(url)).hostname

// console.log('full url: ', url)
// console.log('domain: ', domain)

// const footerLinksExtensions = ['history', 'about', 'awards', 'faq', 'best-deals', 'shop', '', '', ]

// const footerLinks = document.querySelectorAll('.footer__info-menuitem .footer__link, .footer__shop-menuitem .footer__link')

if (url.includes('store')) {
    for (let i = 0; i < footerLinks.length; i++) {
        footerLinks[i].href = 'index.html#' + footerLinksExtensions[i]
    }
} else {
    for (let i = 0; i < footerLinks.length; i++) {
        footerLinks[i].href = '#' + footerLinksExtensions[i]
    }
}

// const footerLinksExtensions = ['history', 'about', 'awards', 'faq', 'best-deals', 'shop', '', '', ]

// const footerLinks = document.querySelectorAll('.footer__info-menuitem .footer__link, .footer__shop-menuitem .footer__link')

// const url = window.location.href;

// for (let i = 0; i < footerLinks.length; i++) {
//     if (url.includes('index.html')) {
//         footerLinks[i].href += footerLinksExtensions[i]
//     } else {
//         footerLinks[i].href += footerLinks[i].href.slice(0, -1) + 'index.html#' + footerLinksExtensions[i]
//     }
// }



// const url = window.location.href;

// const footerLinks = document.querySelectorAll('.footer__info-menuitem .footer__link, .footer__shop-menuitem .footer__link')


// footerLinks.forEach( (el) => {
//     if (!url.includes('index.html')) {
//         const startOfPageHref = url.lastIndexOf('/') + 1
//         const endOfPageHref = url.length
//         const currentLink = el.href
//         el.href = currentLink.slice(0, startOfPageHref) + 'index.html' + currentLink.slice(endOfPageHref)
//     }
// })

const instagramPhotos = [
    'img/footer-photogallery-corks.png',
    'img/footer-photogallery-drinking.png',
    'img/footer-photogallery-bottle&fruits.png',
    'img/footer-photogallery-bottles&glass.png',    
    'img/footer-photogallery-grapes.png',
    'img/footer-photogallery-wine.png'
]


const instragramOuterContainer = document.querySelector('.footer__instagram-expanded-outer')
const instagramThumbnails = document.querySelectorAll('.footer__thumbnail')

const closeWindowBtn = document.querySelector('.footer_instagram-expanded-close')

closeWindowBtn.addEventListener('click', () => {
    setTimeout( () => {
        instragramOuterContainer.style.visibility = 'hidden'
        while(largePhotosContainer.firstChild) {
            largePhotosContainer.removeChild(largePhotosContainer.firstChild)
        }
    }, 1000)
    instragramOuterContainer.style.opacity = '0'
    instragramOuterContainer.style.transition = 'opacity 1s'
})

const largePhotosContainer = document.querySelector('.footer__instagram-large-image')

for (let i = 0; i < instagramThumbnails.length; i++) {
    instagramThumbnails[i].addEventListener('click', () => {
        const largePhotoSrc = instagramThumbnails[i].src
        const largePhoto = document.createElement('img')
        largePhoto.src = largePhotoSrc
        largePhoto.alt = 'Large Instagram photo'
        largePhoto.className = 'footer__instagram-large-img'
        largePhotosContainer.appendChild(largePhoto)
        instragramOuterContainer.style.visibility = 'visible'
        instragramOuterContainer.style.opacity = '1'
    })
}

const leftArrow = document.querySelector('.footer__instagram-expanded-left')
const rightArrow = document.querySelector('.footer__instagram-expanded-right')
leftArrow.addEventListener('click', scrollLeft)
rightArrow.addEventListener('click', scrollRight)

function scrollLeft() {
    const currentPhoto = document.querySelector('.footer__instagram-large-img')
    currentPhoto.style.transform = 'translateX(-100%)'
    const currentSrc = currentPhoto.src.substr(currentPhoto.src.search('img/footer-'))

    const newSrc = instagramPhotos.indexOf(currentSrc) === instagramPhotos.length - 1 ? instagramPhotos[0] : instagramPhotos[instagramPhotos.indexOf(currentSrc) + 1]
    const newPhoto = document.createElement('img')
    newPhoto.src = newSrc
    newPhoto.alt = 'Large Instagram photo'
    newPhoto.className = 'footer__instagram-large-img'
    newPhoto.style.transform = 'translateX(100%)'
    newPhoto.style.display = 'none'

    setTimeout( () => {
        largePhotosContainer.removeChild(largePhotosContainer.firstChild)
        largePhotosContainer.appendChild(newPhoto)
        newPhoto.style.display = 'initial'
        setTimeout( () => {
            newPhoto.style.transform = 'translateX(0%)'
        }, 10)
        // newPhoto.addEventListener('wheel', (e) => {
        //     e.preventDefault()
        //     newPhoto.style.maxHeight = 'none'
        //     this.width += Math.floor(e.deltaY)
        // })
    }, 300)

}

function scrollRight() {
    const currentPhoto = document.querySelector('.footer__instagram-large-img')
    currentPhoto.style.transform = 'translateX(110%)'
    const currentSrc = currentPhoto.src.substr(currentPhoto.src.search('img/footer-'))

    const newSrc = instagramPhotos.indexOf(currentSrc) === 0 ? instagramPhotos[instagramPhotos.length - 1] : instagramPhotos[instagramPhotos.indexOf(currentSrc) - 1]
    const newPhoto = document.createElement('img')
    newPhoto.src = newSrc
    newPhoto.alt = 'Large Instagram photo'
    newPhoto.className = 'footer__instagram-large-img'
    newPhoto.style.transform = 'translateX(-100%)'
    newPhoto.style.display = 'none'
    
    setTimeout( () => {
        largePhotosContainer.removeChild(largePhotosContainer.firstChild)
        largePhotosContainer.append(newPhoto)
        newPhoto.style.display = 'initial'
        setTimeout( () => {
            newPhoto.style.transform = 'translateX(0%)'
        }, 10)    
        // newPhoto.addEventListener('wheel', (e) => {
        //     e.preventDefault()
        //     newPhoto.style.maxHeight = 'none'
        //     newPhoto.width -= Math.floor(e.deltaY)
        //     newPhoto.height -= Math.floor(e.deltaY)
        // })
    }, 300)
}