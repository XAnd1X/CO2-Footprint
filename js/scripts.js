// DataTable ertellen
new DataTable('#co2Table', {
    ajax: {
        url: '/data/CO2_Unternehmen.json',
        dataSrc: ''
    },
    columns: [
        { data: 'Land', title: 'Land' },
        { data: 'Unternehmen', title: 'Unternehmen' },
        { data: 'CO2-Ausstoß', title: 'CO<sub>2</sub>-Ausstoß (in Tonnen)' }
    ],
    initComplete: function () {
        // DataTables-API-Objekt holen
        const table = this.api();
        
        this.api()
            .columns()
            .every(function () {
                let column = this;
                let title = column.footer().textContent;
    
                let input = document.createElement('input');
                input.placeholder = title;
                column.footer().replaceChildren(input);
    
                input.addEventListener('keyup', () => {
                    const quotedSearchFooterValue = quoting(input.value); // Quoting der unteren Suchfelder zum Schutz vor XSS 
                    if (column.search() !== quotedSearchFooterValue) {
                        column.search(quotedSearchFooterValue).draw();
                    }
                });
            });

        // Quoting des oberen Suchfeldes zum Schutz vor XSS 
        $('#dt-search-0').on('keyup', function () {
            const quotedSearchValue = quoting($(this).val()); 
            table.search(quotedSearchValue).draw();
            console.log(quotedSearchValue)
        });
 
    },  
    language: {
        url: 'https://cdn.datatables.net/plug-ins/2.1.8/i18n/de-DE.json'
    },
});
    
// Funktion LTR/RTL Button
function changeSidebarDirection() {
    const sidebar = document.getElementById('flex-sidebar');
    const switchButton = document.getElementById('switchButton');
    const textSidebar = document.getElementById('text-sidebar');
    const ltr = document.getElementById('textLTR');
    const rtl = document.getElementById('textRTL');

    if (switchButton.checked) { // RTL
        sidebar.classList.add('flex-row-reverse'); // Sidebar rechtsbündig
        textSidebar.classList.add('text-end'); // Text rechtsbündig
        // Schriftfarbe Button
        ltr.classList.remove('text-white'); 
        ltr.classList.add('text-secondary');
        rtl.classList.remove('text-secondary');
        rtl.classList.add('text-white');
    } else { //LTR
        sidebar.classList.remove('flex-row-reverse'); // Sidebar rechtsbündig
        textSidebar.classList.remove('text-end'); // Text rechtsbündig
        // Schriftfarbe Button
        rtl.classList.remove('text-white');
        rtl.classList.add('text-secondary');
        ltr.classList.remove('text-secondary');
        ltr.classList.add('text-white');
    }
}
    


// Quoting-Funktionen zur Vermeidung von Injektions-Attacken
function quoting (string) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
        };

    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return map[s];
    });
}


