import IInput from '@inkline/inkline/src/components/Input';
import IDropdown from '@inkline/inkline/src/components/Dropdown';
import IDropdownMenu from '@inkline/inkline/src/components/DropdownMenu';

import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from '@inkline/inkline/src/mixins/forms/providers/InjectParentFormProviderMixin';
import ModelProviderMixin from '@inkline/inkline/src/mixins/forms/providers/ModelProviderMixin';
import SchemaProviderMixin from '@inkline/inkline/src/mixins/forms/providers/SchemaProviderMixin';

import EmitChangeMethodMixin from '@inkline/inkline/src/mixins/components/methods/EmitChangeMethodMixin';
import EmitClickMethodMixin from '@inkline/inkline/src/mixins/components/methods/EmitClickMethodMixin';
import EmitFocusMethodMixin from '@inkline/inkline/src/mixins/components/methods/EmitFocusMethodMixin';
import EmitInputMethodMixin from '@inkline/inkline/src/mixins/components/methods/EmitInputMethodMixin';
import EmitKeydownMethodMixin from '@inkline/inkline/src/mixins/components/methods/EmitKeydownMethodMixin';

import DisabledPropertyMixin from '@inkline/inkline/src/mixins/forms/properties/DisabledPropertyMixin';
import NamePropertyMixin from '@inkline/inkline/src/mixins/forms/properties/NamePropertyMixin';
import ReadonlyPropertyMixin from '@inkline/inkline/src/mixins/forms/properties/ReadonlyPropertyMixin';
import ParentFormGroupPropertyMixin from '@inkline/inkline/src/mixins/forms/properties/ParentFormGroupPropertyMixin';
import SizePropertyMixin from '@inkline/inkline/src/mixins/components/properties/SizePropertyMixin';
import TabIndexPropertyMixin from '@inkline/inkline/src/mixins/components/properties/TabIndexPropertyMixin';
import { querySelectorAll, uid, isMobile } from "@inkline/inkline/src/helpers";

export default {
    name: 'ISelect',
    components: {
        IInput,
        IDropdown,
        IDropdownMenu
    },
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        InjectParentFormProviderMixin,
        ModelProviderMixin,
        SchemaProviderMixin,

        // ClickMethodMixin,
        // FocusMethodMixin,
        EmitChangeMethodMixin,
        EmitClickMethodMixin,
        EmitFocusMethodMixin,
        EmitInputMethodMixin,
        EmitKeydownMethodMixin,
        // EmitHoverMethodMixin,

        DisabledPropertyMixin,
        NamePropertyMixin,
        ParentFormGroupPropertyMixin,
        ReadonlyPropertyMixin,
        SizePropertyMixin,
        TabIndexPropertyMixin
    ],
    props: {
        filterable: {
            type: Boolean,
            default: false
        },
        native: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const basename = 'select';

        return {
            isMobile: isMobile(),
            labelModel: '',
            id: this.$attrs.id || uid(basename),
            options: []
        }
    },
    watch: {
        model(value) {
            this.setLabelModel(value);
        }
    },
    methods: {
        setLabelModel(value) {
            const option = this.options.find((o) => o.value === value);

            this.labelModel = option.label || option.value;
        },
        focusInputRef() {
            this.isMobile ? this.$refs.select.focus() : this.$refs.input.focusInputRef();
        },
        clickInputRef() {
            if (this.isMobile) {
                this.$refs.select.click();
            } else {
                this.$refs.input.clickInputRef();
                this.$refs.dropdown.visible ? this.$refs.dropdown.hide() : this.$refs.dropdown.show();
            }
        },
        initElements() {
            this.options = querySelectorAll(this.$children[0].$children[1].$children, 'ISelectOption');
        }
    },
    created() {
        this.classesProvider.add('root', () => ({
            '-prefixed': Boolean(this.$slots.prefix),
            '-suffixed': Boolean(this.$slots.suffix)
        }));

        this.$on('option-click', (option) => {
            this.model = option.value;
        });
    },
    mounted() {
        this.initElements();
        this.$on('init', this.initElements);

        if (this.value) {
            this.setLabelModel(this.value);
        }
    }
};
