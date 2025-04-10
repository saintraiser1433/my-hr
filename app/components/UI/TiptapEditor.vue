<script setup>
const { $api } = useNuxtApp();
const config = useRuntimeConfig();
const repo = repository($api);
const props = defineProps({
  modelValue: String,
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:modelValue"]);
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { url } = await repo.uploadImage(formData);
    return url;
  } catch (err) {
    return handleApiError(err);
  }
};

const addImage = () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  fileInput.onchange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const url = await uploadImage(file);
        if (url) {
          editor.value
            .chain()
            .focus()
            .setImage({ src: `${config.public.STORAGE_URL_UPLOADS}/${url}` })
            .run();
        }
      } catch (error) {
        console.error("Failed to add image:", error);
        setToast("error", err.value.data.message);
      }
    }
  };
  fileInput.click();
};
const focusEditor = () => {
  editor.value?.commands.focus();
};

const lowlight = createLowlight(allLanguages);
const editor = useEditor({
  content: props.modelValue,
  editable: !props.disabled,
  extensions: [
    TiptapStarterKit.configure({
      codeBlock: false,
    }),
    CustomTableCell,
    CustomTableHeader,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TiptapCodeBlockLowlight.configure({ lowlight }),
    TiptapPlaceholder.configure({
      emptyEditorClass: "is-editor-empty",
      placeholder: "Write your post content here",
    }),
    ImageResize.configure({
      inline: true,
      allowBase64: true,
    }),
  ],
  onUpdate: ({ editor }) => {
    emits("update:modelValue", editor.getHTML());
  },
  editorProps: {
    attributes: {
      class: "prose prose-sm focus:outline-none  dark:text-white ",
    },
    transformPastedText(text) {
      return text.toUpperCase();
    },
    handleDrop: (view, event) => {
      const files = event.dataTransfer?.files;
      if (!files || !files.length) return false;

      const file = files[0];
      if (!file.type.startsWith("image/")) return false;

      uploadImage(file).then((url) => {
        const { schema } = view.state;
        const node = schema.nodes.image.create({ src: url });
        const transaction = view.state.tr.replaceSelectionWith(node);
        view.dispatch(transaction);
      });

      return true;
    },
  },
});

watch(
  () => props.modelValue,
  (newVal) => {
    if (editor.value && newVal !== editor.value.getHTML()) {
      editor.value.commands.setContent(newVal);
    }
  }
);

onBeforeUnmount(() => {
  unref(editor.value).destroy();
});
</script>

<template>
  <div class="@container max-w-full">
    <div
      v-if="editor"
      class="flex items-center flex-wrap gap-2 border overflow-hidden font-thin bg-(--background) text-gray-600 p-1 text-md dark:bg-(--background) dark:border-(--border) dark:text-white dark:border-t rounded-t-md"
    >
      <button
        type="button"
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'text-primary': editor.isActive('bold') }"
        class=""
      >
        <Icon name="tabler-bold"></Icon>
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'text-primary': editor.isActive('italic') }"
        class=""
      >
        <Icon name="tabler-italic"></Icon>
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'text-primary': editor.isActive('strike') }"
      >
        <Icon name="tabler-strikethrough"></Icon>
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'text-primary': editor.isActive('code') }"
      >
        <Icon name="tabler-code"></Icon>
      </button>
      <button type="button" @click="editor.chain().focus().unsetAllMarks().run()">
        <Icon name="tabler-clear-formatting"></Icon>
      </button>
      <button
        type="button"
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'text-primary': editor.isActive('paragraph') }"
      >
        <Icon name="bx-paragraph "></Icon>
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'text-primary': editor.isActive('heading', { level: 1 }) }"
      >
        <Icon name="ci-heading-h1"></Icon>
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'text-primary': editor.isActive('heading', { level: 2 }) }"
      >
        <Icon name="ci-heading-h2"></Icon>
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'text-primary': editor.isActive('heading', { level: 3 }) }"
      >
        <Icon name="ci-heading-h3"></Icon>
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'text-primary': editor.isActive('heading', { level: 4 }) }"
      >
        <Icon name="ci-heading-h4"></Icon>
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'text-primary': editor.isActive('heading', { level: 5 }) }"
      >
        <Icon name="ci-heading-h5"></Icon>
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'text-primary': editor.isActive('heading', { level: 6 }) }"
      >
        <Icon name="ci-heading-h6"></Icon>
      </button>

      <button
        type="button"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'text-primary': editor.isActive('bulletList') }"
      >
        <Icon name="fluent-mdl2-radio-bullet"></Icon>
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'text-primary': editor.isActive('orderedList') }"
      >
        <Icon name="fe-list-bullet"></Icon>
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'text-primary': editor.isActive('codeBlock') }"
      >
        <Icon name="fluent-code-block-48-regular"></Icon>
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'text-primary': editor.isActive('blockquote') }"
      >
        <Icon name="tabler-blockquote"></Icon>
      </button>
      <button type="button" @click="editor.chain().focus().setHorizontalRule().run()">
        <Icon name="codicon-horizontal-rule"></Icon>
      </button>
      <button type="button" @click="editor.chain().focus().setHardBreak().run()">
        <Icon name="tabler-page-break"></Icon>
      </button>

      <button
        type="button"
        @click="
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        "
      >
        <Icon name="tabler-table-plus"></Icon>
      </button>
      <button type="button" @click="editor.chain().focus().addColumnBefore().run()">
        <Icon name="tabler-column-insert-left"></Icon>
      </button>
      <button type="button" @click="editor.chain().focus().addColumnAfter().run()">
        <Icon name="tabler-column-insert-right"></Icon>
      </button>
      <button type="button" @click="editor.chain().focus().deleteColumn().run()">
        <Icon name="tabler-column-remove"></Icon>
      </button>
      <button type="button" @click="editor.chain().focus().addRowBefore().run()">
        <Icon name="tabler-row-insert-top"></Icon>
      </button>
      <button type="button" @click="editor.chain().focus().addRowAfter().run()">
        <Icon name="tabler-row-insert-bottom"></Icon>
      </button>
      <button type="button" @click="editor.chain().focus().deleteRow().run()">
        <Icon name="tabler-row-remove"></Icon>
      </button>
      <button type="button" @click="editor.chain().focus().deleteTable().run()">
        <Icon name="tabler-table-down"></Icon>
      </button>
      <button type="button" @click="addImage">
        <Icon name="mdi-light-image"></Icon>
      </button>
      <button type="button" @click="editor.chain().focus().mergeCells().run()">
        <Icon name="material-symbols-cell-merge-rounded"></Icon>
      </button>
      <button
        type="button"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        <Icon name="fad-undo"></Icon>
      </button>
      <button
        type="button"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
      >
        <Icon name="fad-redo "></Icon>
      </button>
    </div>

    <TiptapEditorContent
      class="w-full pt-1 text-sm cursor-default h-78 overflow-auto custom-scrollbar border-x border-b px-2 dark:border-(--border) dark:bg-(--background)"
      :editor="editor"
      @click="focusEditor"
    />
  </div>
</template>
