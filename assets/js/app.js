jQuery(document).ready(function() {

    // Dropdown item active when clicking
    jQuery('.lang-text').click(function() {
        jQuery(this).parents('.sel-lang').toggleClass('active');
    });
    jQuery('.sel-lang li').click(function() {
        let text = jQuery(this).text();
        jQuery(this).parents('.sel-lang').find('.lang-text').text(text);
        jQuery(this).parents('.sel-lang').removeClass("active");
        jQuery(this).parent().children().removeClass('selected');
        jQuery(this).addClass('selected');
    });

    // user dropdown activate
    jQuery('.pro-name-inner').click(function() {
        jQuery(this).parents('.user').toggleClass('active');
    })

    // activate sidebar
    var bar = jQuery('.bars-inner');
    bar.click(function() {
        jQuery('.sidebar').addClass('active');
        jQuery('body').addClass('no-scroll');
    });


    // sidebar remove function
    function removeSidebar() {
        jQuery('.sidebar').removeClass('active');
        jQuery('body').removeClass('no-scroll');
    }

    // close sidebar when clicking the close icon
    var closeIcon = jQuery('.sidebar-close');
    closeIcon.click(function() {
        removeSidebar();
    });

    //remove default behavior when click an item
    var contentItem = jQuery('.content-item:not(.create-new)');
    contentItem.click(function(e) {
        e.preventDefault();
        let text = jQuery(this).find('h4').text();
        let url = `${document.location.origin}/create-new.html?name=${encodeURIComponent(text)}`;
        window.location.href = url;
    })

    // add love effect 

    var favIcon = jQuery('.fav-icon');
    favIcon.click(function(e) {
        e.preventDefault();
        jQuery(this).parents('.content-item').toggleClass('fav');
    });


    // Counting items for tools subitems
    var toolsItem = jQuery('.tools-item');
    toolsItem.each((index, item) => {
        let items = jQuery(item).find('li').length;
        jQuery(item).find('.sub-item-number').text(items);
    });

    // show or hide sub items by clicking tools-name
    var toolsItems = jQuery('.tools-name');
    jQuery('.tools-item:not(.active) .tools-sub-item').slideToggle();
    toolsItems.click(function() {
        jQuery(this).parents('.tools-item').toggleClass('active');
        jQuery(this).parents('.tools-item').find('.tools-sub-item').slideToggle();
    });

    // add fav for tools items
    var toolsSubItems = jQuery('.tools-sub-item a');
    toolsSubItems.click(function(e) {
        e.preventDefault();
        if (e.target.closest('.fav-icon')) {
            return false
        }

        let text = jQuery(this).text().trim();
        if (!jQuery(this).closest('.tools').hasClass('content-tools')) {
            let url = `${document.location.origin}/create-new.html?name=${encodeURIComponent(text)}`;
            window.location.href = url;
        }

        jQuery(this).parents('.tools').find('.tools-title h4').text(text);
        jQuery(this).parents('.tools').find('.tools-title h4').attr('name', text);
        jQuery(this).parent().parent().children().slideToggle();
        jQuery(this).parents('.content-tools').removeClass('active');
        jQuery(this).parents('.tools-item').toggleClass('active');
        jQuery(this).parents('.content-tools').find('.tools-body').slideToggle();
        jQuery(this).parents('.content-tools').find('.search').slideToggle();
    });

    var toolsSubItemsIcon = jQuery('.tools-sub-item .fav-icon');
    toolsSubItemsIcon.click(function() {
        jQuery(this).parents('.tools-sub-item').toggleClass('fav');
    });

    // activate tabs item 
    jQuery('.tabs-link a:first-child').addClass('active');
    jQuery('.tabs-contents .tab-content:not(:first-child)').fadeOut();
    jQuery('.tabs-contents .tab-content:first-child').addClass('active');
    var tabItem = jQuery('.tabs-links .tab');
    tabItem.click(function(e) {
        e.preventDefault();

        // get id
        let id = jQuery(this).attr('href');

        // remove & add active class
        jQuery(this).parent().children().removeClass('active');
        jQuery(this).addClass('active');

        // hide & show tab contents
        jQuery('.tabs-contents .tab-content').fadeOut();
        jQuery(id).fadeIn();
    });


    // hide tools section in mobile devices
    // if (matchMedia('only screen and (max-width: 991px)').matches) {
    //     let tools = jQuery('.tools').addClass('hide');
    //     tools.click(function() {
    //         jQuery(this).removeClass('hide');
    //     })
    // }

    // Content tools activate by on click
    var contentTools = jQuery('.content-tools .tools-title');
    contentTools.click(function() {
        jQuery(this).parents('.content-tools').toggleClass('active');
        jQuery(this).parents('.content-tools').find('.tools-body').slideToggle();
        jQuery(this).parents('.content-tools').find('.search').slideToggle();
    });

    // activate tone select dropdown
    var toneSelect = jQuery('.info-item select');
    toneSelect.click(function() {
        jQuery(this).toggleClass('active');
    });

    // activate dropdown
    var formDropdown = jQuery('.form-dropdown select');
    formDropdown.click(function() {
        jQuery(this).toggleClass('active');
    })

    // copied class add by clicking copy button
    var copyButton = jQuery('.result-buttons .copy');
    copyButton.click(function() {
        let copiedText = jQuery(this).parents('.result-item').find('.content p').text();
        navigator.clipboard.writeText(copiedText);
        jQuery(this).addClass('copied');
        jQuery(this).html(`<i class="icon"></i> Copied!`);
    });

    // copy all contents 
    var copyAllButton = jQuery('.content-results .copy-all');
    copyAllButton.click(function() {
        let allTexts = jQuery(this).parents('.content-results').find('.content p').text();
        navigator.clipboard.writeText(allTexts);
    })

    // saved class add by clicking save button
    var copyButton = jQuery('.result-buttons .save');
    copyButton.click(function() {
        jQuery(this).toggleClass('saved');
    });

    // remove the content 
    var removeButton = jQuery('.result-buttons .remove-item');
    removeButton.click(function() {
        let parent = jQuery(this).parents('.result-item').fadeOut().remove();
    })


    // character counting
    var resultContent = jQuery('.result-item .content p');
    resultContent.each((index, item) => {
        let totalWords = item.innerText.split(" ");
        let totalChars = item.innerText.length;

        jQuery(item).parents('.result-item').find('.total-lengths').text(`${totalWords.length} words / ${totalChars} chars`)
    });

    // append undo & redo button 
    var undoButton = jQuery('.text-editor .richText-undo');
    var redoButton = jQuery('.text-editor .richText-redo');
    jQuery('.richText-toolbar ul').prepend(redoButton);
    jQuery('.richText-toolbar ul').prepend(undoButton);

    // hide unnecessary item from text-editor
    jQuery('.text-editor .richText-toolbar .richText-help').hide();
    jQuery('.richText .richText-editor').text('Start typing, copy or paste to get started.......');
    jQuery('.richText-btn[title="Add video"], .richText-btn[title="Add table"], .richText-btn[title="Remove styles"], .richText-btn[title="Show HTML code"]').parent().remove();

    // append new element

    var editorDots = jQuery('.text-editor .dots');
    var editorSave = jQuery('.text-editor .save-button');
    var editorCounting = jQuery('.editor-counting');
    jQuery('.richText .richText-toolbar ul').append(editorDots);
    jQuery('.richText .richText-toolbar ul').append(editorSave);
    jQuery('.richText .richText-toolbar:last-child').append(editorCounting);


    // content creating button click
    var contentCreate = jQuery('.content-info-inner input:submit, .search-inner .submit-button input:submit');
    contentCreate.click((e) => {
        e.preventDefault();
    });


    // remove anything by clicking by outside
    document.onclick = function(e) {
        if (!e.target.closest('.bars')) {
            if (!e.target.closest('.sidebar')) {
                removeSidebar();
            }
        }
    };

})