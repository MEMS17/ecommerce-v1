/**
 * Lien d'évitement (Skip link)
 */
window.onload = function() {
    var skipLinks = document.createElement('div');
    skipLinks.innerHTML += '<a class="skip-link" href="#content">Aller au contenu principal</a>';
    skipLinks.innerHTML += '<a class="skip-link" href="#btnSearch">Aller à la recherche</a>';
    skipLinks.innerHTML += '<a class="skip-link" href="#footer">Aller au pied de page</a>';
    document.body.insertBefore(skipLinks, document.body.firstChild);
};

/**
 * Liste déroulante personnalisé avec fonction de filtre par catégorie
 */
function showDropDownMenu(idListMenu) {
    const dropdown = document.getElementById(idListMenu);
    const button = document.querySelector('[aria-controls="' + idListMenu + '"]');

    function hideDropdown() {
        if (dropdown) {
          dropdown.style.display = 'none';
        }

        document.removeEventListener('click', hideDropdown);
        document.removeEventListener('keydown', handleKeyPress);
    }

    function handleKeyPress(event) {
        if (event.key === 'Escape') {
            hideDropdown();
        }
    }

    if (dropdown) {
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        } else {
            dropdown.style.display = 'block';

            document.addEventListener('click', function (event) {
                if (!dropdown.contains(event.target) && event.target !== button) {
                    hideDropdown();
                }
            });

            document.addEventListener('keydown', handleKeyPress);
        }
    }
}

function showCatProduct(category, listProducts) {
    var productList = document.getElementById(listProducts).children;

    if (category === 'all') {
        // Afficher tous les éléments
        for (var i = 0; i < productList.length; i++) {
            productList[i].style.display = 'block';
        }
    } else {
        // Sinon, parcourir les éléments et afficher/masquer en fonction de l'attribut data-product
        for (var i = 0; i < productList.length; i++) {
            var product = productList[i];
            var productCategory = product.getAttribute('data-product');

            if (productCategory === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        }
    }
}

/**
 * Au clic sur les boutons 'Ajouter au panier" ajout un numéro au compteur visible que le bouton #btnShop
 */
function addShop(countShopId) {
    var countShopElement = document.getElementById(countShopId);
  
    // Obtenez la valeur actuelle du compteur, convertissez-la en nombre et incrémentez-la de 1
    var currentCount = parseInt(countShopElement.textContent, 10);
    currentCount += 1;
  
    // Mettez à jour le contenu du compteur avec la nouvelle valeur
    countShopElement.textContent = currentCount;
}

/**
 * Popin
 */
/*
window.onload = function() {
    const openButton = document.getElementById('btnSearch');
    const popin = document.getElementById('popin');
    const closeButton = document.getElementById('popinBtnClose');

    openButton.addEventListener('click', () => {
        openPopin();
    });

    closeButton.addEventListener('click', () => {
        closePopin();
    });

    popin.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closePopin();
        }
    });
};
*/

function openPopin() {
    // Ouvrir la popin
    popin.style.display = 'block';

    // Désactiver la tabulation en dehors de la popin
    document.addEventListener('keydown', trapTabKey);

    // Définir le focus sur le premier élément de la popin
    const firstFocusableElement = popin.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusableElement) {
        firstFocusableElement.focus();
    }
}

function closePopin() {
    const openButton = document.getElementById('btnSearch');

    // Fermer la popin
    popin.style.display = 'none';

    // Renvoyer le focus au bouton d'ouverture de la popin
    openButton.focus();
}

function trapTabKey(event) {
    // Désactive la tabulation en dehors de la popin
    if (event.key === 'Tab') {
        const focusableElements = popin.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    }
}





$(window, document, undefined).ready(function() {

  $('input').blur(function() {
    var $this = $(this);
    if ($this.val())
      $this.addClass('used');
    else
      $this.removeClass('used');
  });

  var $ripples = $('.ripples');

  $ripples.on('click.Ripples', function(e) {

    var $this = $(this);
    var $offset = $this.parent().offset();
    var $circle = $this.find('.ripplesCircle');

    var x = e.pageX - $offset.left;
    var y = e.pageY - $offset.top;

    $circle.css({
      top: y + 'px',
      left: x + 'px'
    });

    $this.addClass('is-active');

  });

  $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
  	$(this).removeClass('is-active');
  });

});