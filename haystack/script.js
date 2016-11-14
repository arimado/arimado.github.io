const state = {

};

// -----------------------------------------------------------------------------

const concatenateValuesOf = ( obj ) => {
  let result = ''
  for (let key in obj) {
    result += `${obj[key].reduce((p, c) => { return p += " " + c + " " })}`
  }
  return result
}

const generateCard = ( number ) => {
  return {
    baseClasses: [`slide-in`, `card`]
  , cardNumber: [`${number}`]
  }
}

const createCard = ( cardData ) => {
  const card = document.createElement('div')
  card.className = concatenateValuesOf(cardData)
}

const renderElement = ( elementData ) => {
  return () => {
  }
}

const renderWith = () => {
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(generateCard)
const cardElements = cards.map(createCard)

// -----------------------------------------------------------------------------


// d_ : dom elements
// s_ : side effects

const s_resetCards = (cardElements) => {
  cardElements.forEach((card) => {
    card.classList.remove('slide-in-left');
    card.classList.remove('slide-in-right');
  })
}

const animationDoneCB = ( element, index, elements ) => {
  return ( e ) => {
    if ( elements.length - 1 === index ) {
      s_resetCards(elements);
      animateCards();
    }
  }
}

const d_cards = document.querySelectorAll('.card')

const animateCards = () => {
  d_cards.forEach((card, idx) => {
    const cardNo = idx + 1;
    setTimeout(function () {
      if ( idx % 2 === 0 ) {
        card.classList.add('slide-in-right')
      } else {
        card.classList.add('slide-in-left')
      }
      card.addEventListener("webkitAnimationEnd", animationDoneCB(card, idx, d_cards),false);
      card.addEventListener("animationend", animationDoneCB(card, idx, d_cards),false);
      card.addEventListener("oanimationend", animationDoneCB(card, idx, d_cards),false);
    }, cardNo * 5000);
  });
}

animateCards();



// add slide toggle in
// no repeat
// when all done
