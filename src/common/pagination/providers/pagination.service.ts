import { Inject, Injectable } from '@nestjs/common';
import { PaginateQueryDTO } from '../dto/paginate-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { IPaginated } from '../interfaces/paginate.interface';
import type { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class PaginationService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  /**
   * This function will attach the query params.
   * @param paginateQueryData
   * @param url
   * @returns url
   */
  constructQuery(paginateQueryData: PaginateQueryDTO, url: URL) {
    const { limit, page } = paginateQueryData;
    url = new URL(url.toString()); //Clone the incoming URL
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('page', page.toString());
    return url;
  }

  async paginateQuery<T extends ObjectLiteral>(
    paginateQueryData: PaginateQueryDTO,
    repository: Repository<T>,
  ): Promise<IPaginated<T>> {
    const url = new URL(
      this.request.protocol + '://' + this.request.headers.host,
    );

    const { limit, page } = paginateQueryData;

    const data = await repository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / limit);

    const firstPageLink = this.constructQuery(
      {
        limit,
        page: 1,
      },
      url,
    );
    const lastPageLink = this.constructQuery(
      {
        limit,
        page: totalPages,
      },
      url,
    );
    const currentPageLink = this.constructQuery(
      {
        limit,
        page,
      },
      url,
    );
    const nextPageLink =
      page === totalPages
        ? undefined
        : this.constructQuery(
            {
              limit,
              page: page + 1,
            },
            url,
          );
    const previousPageLink =
      page === 1
        ? undefined
        : this.constructQuery(
            {
              limit,
              page: page - 1,
            },
            url,
          );

    const response: IPaginated<T> = {
      data,
      meta: {
        totalItems,
        totalPages,
        itemsPerPage: limit,
        currentPage: page,
      },
      links: {
        first: firstPageLink,
        last: lastPageLink,
        current: currentPageLink,
        next: nextPageLink,
        previous: previousPageLink,
      },
    };

    return response;
  }
}
