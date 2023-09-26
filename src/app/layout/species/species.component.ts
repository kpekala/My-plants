import { Component, Input, OnInit } from '@angular/core';
import { SpeciesService } from './species.service';
import { Species } from './species.model';
import { Subscription, switchMap, tap } from 'rxjs';
import { ProfileService } from '../home/profile/profile.service';
import { Profile } from '../home/profile/profile.model';
import { collection } from 'firebase/firestore';

@Component({
  selector: 'app-find-plants',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit{

  @Input() isCollection: boolean = false;

  species: Species[] = [];
  speciesDetailsSub: Subscription;
  showModal = false;
  selectedSpecies = null;

  profile: Profile = null;

  constructor (private speciesService: SpeciesService, 
               private profileService: ProfileService){

  }

  ngOnInit(): void {
    this.reloadSpecies();
  }

  reloadSpecies() {
    this.speciesService.fetchPlants().pipe(
      tap((species: Species[]) => {
        this.species = species;
      }),
      switchMap((species: Species[]) => {
        return this.profileService.getProfile();
      })).subscribe({
        next: (profile: Profile) => {
          this.profile = profile;
        }
      });
  }

  onShowDetails(species: Species){
    this.selectedSpecies = species;
    this.showModal = true;
  }
  
  onCloseDetails(){
    this.selectedSpecies = null;
    this.showModal = false;
  }

  showItem(id: number): boolean {
    if(this.isCollection && !this.profile) 
      return false;
    if(!this.isCollection || !this.profile)
      return true;
    return this.profile.collection.includes(id);
  }

  onItemRemovedFromCollection() {
    this.reloadSpecies();
  }
}
