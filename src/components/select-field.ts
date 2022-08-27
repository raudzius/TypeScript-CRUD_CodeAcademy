interface SelectOption {
    label: string;
    value: string;
}

interface SelectFieldProps {
    label: string;
    options: SelectOption[];
    onChange: (value: string) => void;
}

export default class SelectField {
    private static count = 0;

    private readonly id: string;

    private props: SelectFieldProps;

    public htmlElement: HTMLDivElement;

    constructor(props: SelectFieldProps) {
        this.htmlElement = document.createElement('div');

        this.id = `SelectField-${SelectField.count += 1}`;
        this.props = props;

        this.initialize();
    }

    private initialize() {
        const { label, options, onChange } = this.props;

        const labelElement = document.createElement('label');
        labelElement.textContent = `${label}:`;
        labelElement.className = 'mb-1';
        labelElement.setAttribute('for', this.id);

        const selectElement = document.createElement('select');
        selectElement.id = this.id;
        selectElement.className = 'form-select';
        options.forEach(({ label: optionLabel, value }) => {
            const optionElement = document.createElement('option');
            optionElement.value = value;
            optionElement.textContent = optionLabel;
            selectElement.append(optionElement);
        });
        selectElement.addEventListener('change', () => {
            onChange(selectElement.value);
        });

        this.htmlElement.className = 'mb-3';
        this.htmlElement.append(labelElement, selectElement);
    }
}
