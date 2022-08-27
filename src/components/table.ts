interface RowData {
    id: string;
    [key: string]: string;
}

interface TableProps<Type> {
    title: string;
    columns: Type;
    rowsData: Type[];
    onDelete: (id: string) => void;
}

export default class Table<T extends RowData> {
    htmlElement: HTMLTableElement;

    private props: TableProps<T>;

    private thead: HTMLTableSectionElement;

    private tbody: HTMLTableSectionElement;

    constructor(props: TableProps<T>) {
        this.props = props;

        this.htmlElement = document.createElement('table');
        this.thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');

        this.initialize();
        this.renderView();
    }

    initialize() {
        this.htmlElement.className = 'table table-striped';
        this.htmlElement.append(this.thead, this.tbody);
    }

    renderHeaderView(): void {
        this.thead.innerHTML = '';
        const { title, columns } = this.props;
        const columnNameArray = Object.values(columns);
        const titleTrElement = document.createElement('tr');
        const trElement = document.createElement('tr');
        const h3 = document.createElement('h3');
        const titleTrElementTh = document.createElement('th');

        h3.textContent = title;
        h3.style.textAlign = 'center';
        titleTrElementTh.colSpan = columnNameArray.length + 1;
        titleTrElementTh.append(h3);
        titleTrElement.append(titleTrElementTh);

        columnNameArray.push('');
        columnNameArray.forEach((colName) => {
            const thElement = document.createElement('th');
            thElement.textContent = colName;
            trElement.append(thElement);
        });

        this.thead.className = 'table-dark';
        this.thead.append(titleTrElement, trElement);
    }

    private renderBodyView = (): void => {
        const { rowsData, columns } = this.props;

        this.tbody.innerHTML = '';

        rowsData.forEach((rowData) => {
            const trElement = document.createElement('tr');

            Object.keys(columns).forEach((key) => {
                const tdElement = document.createElement('td');
                tdElement.textContent = rowData[key];
                trElement.append(tdElement);
                this.tbody.append(trElement);
            });
            this.addActionsCell(trElement, rowData.id);
        });
    };

    private renderView() {
        this.renderHeaderView();
        this.renderBodyView();
    }

    private addActionsCell = (rowHtmlElement: HTMLTableRowElement, id: string): void => {
        const { onDelete } = this.props;

        const buttonCell = document.createElement('td');

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.innerHTML = 'Delete';
        deleteButton.className = 'btn btn-danger';
        deleteButton.addEventListener('click', () => onDelete(id));
        deleteButton.style.width = '80px';

        buttonCell.append(deleteButton);
        rowHtmlElement.append(buttonCell);
    };

    updateProps(newProps: Partial<TableProps<T>>) {
        this.props = {
            ...this.props,
            ...newProps,
        };

        this.renderView();
    }
}
