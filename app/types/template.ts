export interface TemplateModel {
  id?: number;
  template_name: string;
  description: string;
  templateList?: TemplateDetail[];
}

export interface TemplateDetail {
  id?: number;
  title: string;
  description: string;
  score?: number;
  templateId?: number;
}
