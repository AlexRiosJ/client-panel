import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    // Get id from url
    this.id = this.route.snapshot.params.id;
    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }

      this.client = client;
    });
  }

  onDeleteClick(): void {
    console.log(`Deleting: ${this.id}`);
  }

  updateBalance(): void {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance updated', {
      cssClass: 'alert-success'
    });
    this.hasBalance = this.client.balance > 0;
    this.showBalanceUpdateInput = !this.showBalanceUpdateInput;
  }

}
