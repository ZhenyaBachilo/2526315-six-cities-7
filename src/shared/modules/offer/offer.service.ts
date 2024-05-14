import { inject } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { OfferService } from './offer-service.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findByOfferId(
    offerId: string,
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }

  public async findByOfferName(
    offerName: string,
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findOne({ name: offerName }).exec();
  }

  public async findByOfferNameOrCreate(
    offerName: string,
    dto: CreateOfferDto,
  ): Promise<DocumentType<OfferEntity>> {
    const existedOffer = await this.findByOfferName(offerName);

    if (existedOffer) {
      return existedOffer;
    }

    return this.create(dto);
  }
}
