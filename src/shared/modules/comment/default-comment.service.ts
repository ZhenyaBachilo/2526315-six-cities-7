import { Component } from '../../types/index.js';
import { CommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { inject, injectable } from 'inversify';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>,
  ) {}

  public async create(
    dto: CreateCommentDto,
  ): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('userId');
  }

  public async findByOfferId(
    offerId: string,
  ): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({ offerId }).populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    return this.commentModel
      .deleteMany({ offerId })
      .then((r) => r.deletedCount);
  }
}
