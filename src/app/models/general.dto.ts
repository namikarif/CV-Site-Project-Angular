import {SiteSettingsDto} from './site-settings.dto';
import {GeneralInformationDto} from './general-information.dto';
import {AwardDto} from './award.dto';
import {BlogDto} from './blog.dto';
import {EducationDto} from './education.dto';
import {ReferenceDto} from './reference.dto';
import {ProjectDto} from './project.dto';
import {ProjectCategoriesDto} from './project-categories.dto';
import {SkillDto} from './skill.dto';

export class GeneralDto {
  awards: Array<AwardDto>
  blogs: Array<BlogDto>
  completedEducations: Array<any>;
  continuingEducations: Array<any>;
  experiences: Array<EducationDto>;
  generalInformation: GeneralInformationDto;
  myReferences: Array<ReferenceDto>;
  projects: Array<ProjectDto>;
  projectCategories: Array<ProjectCategoriesDto>;
  siteSettings: SiteSettingsDto;
  skills: Array<SkillDto>;
}
