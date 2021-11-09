import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GeneralInformationDto} from '../../models/general-information.dto';
import {SiteSettingsDto} from '../../models/site-settings.dto';
import {DOCUMENT} from '@angular/common';
import {GeneralDto} from '../../models/general.dto';
import {environment} from '../../../environments/environment';
import {NgForm} from '@angular/forms';
import {AwardDto} from '../../models/award.dto';
import {BlogDto} from '../../models/blog.dto';
import {EducationDto} from '../../models/education.dto';
import {ReferenceDto} from '../../models/reference.dto';
import {ProjectDto} from '../../models/project.dto';
import {ProjectCategoriesDto} from '../../models/project-categories.dto';
import {SkillDto} from '../../models/skill.dto';
import {siteOptions} from '../../../environments/site-options';

declare const $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
