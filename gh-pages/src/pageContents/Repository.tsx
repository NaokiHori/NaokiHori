import React, { JSX } from "react";
import { Modal, useModal, ModalHandler } from "../components/Modal/Modal";
import { DisplaySize } from "../global.css";
import {
  Category,
  RepositoryInfo,
  useRepositoryInfo,
} from "./Repository/hooks";
import { Card } from "./Repository/Card";
import * as style from "./repository.css";

function CategoryName({
  category,
  isSelected,
  handleClick,
}: {
  category: Category;
  isSelected: boolean;
  handleClick: () => void;
}): JSX.Element {
  return (
    <button
      className={
        isSelected ? style.categoryName.selected : style.categoryName.unselected
      }
      onClick={() => {
        handleClick();
      }}
    >
      {category.name}
    </button>
  );
}

function CardList({
  displaySize,
  selectedCategory,
}: {
  displaySize: DisplaySize;
  selectedCategory: Category | null;
}): JSX.Element {
  if (selectedCategory === null) {
    return <></>;
  }
  const categoryName: string = selectedCategory.name;
  const repositoryNames: string[] = selectedCategory.repositoryNames;
  const showHeader: boolean = displaySize === "Narrow";
  return (
    <div className={style.cardList}>
      {showHeader && (
        <div className={style.categoryNameInCardList}>{categoryName}</div>
      )}
      <div className={style.cards}>
        {repositoryNames.map((repositoryName: string, key: number) => (
          <Card key={key} repositoryName={repositoryName} />
        ))}
      </div>
    </div>
  );
}

export function Repository(): JSX.Element {
  const { repositoryInfo }: { repositoryInfo: RepositoryInfo } =
    useRepositoryInfo();
  const categories: Category[] = repositoryInfo.categories;
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);
  const modalHandler: ModalHandler = useModal({
    handleClose: () => {
      setSelectedCategory(null);
    },
  });
  const handleClickCategory = (
    displaySize: DisplaySize,
    category: Category,
  ): void => {
    switch (displaySize) {
      case "Wide": {
        setSelectedCategory(category);
        return;
      }
      case "Narrow": {
        setSelectedCategory(category);
        modalHandler.open();
        return;
      }
      default: {
        throw new Error("unreachable");
      }
    }
  };
  return (
    <>
      <div className={style.repository.wide}>
        <div className={style.categoryNameAndCardList}>
          <div className={style.categoryNames}>
            {categories.map((category: Category, key: number) => {
              const isSelected: boolean =
                selectedCategory !== null &&
                category.name === selectedCategory.name;
              return (
                <CategoryName
                  key={key}
                  category={category}
                  isSelected={isSelected}
                  handleClick={() => {
                    handleClickCategory("Wide", category);
                  }}
                />
              );
            })}
          </div>
        </div>
        <CardList displaySize="Wide" selectedCategory={selectedCategory} />
      </div>
      <div className={style.repository.narrow}>
        <div className={style.categoryNameAndCardList}>
          <div className={style.categoryNames}>
            {categories.map((category: Category, key: number) => {
              const isSelected: boolean =
                selectedCategory !== null &&
                category.name === selectedCategory.name;
              return (
                <CategoryName
                  key={key}
                  category={category}
                  isSelected={isSelected}
                  handleClick={() => {
                    handleClickCategory("Narrow", category);
                  }}
                />
              );
            })}
          </div>
        </div>
        <Modal modalHandler={modalHandler}>
          <CardList displaySize="Narrow" selectedCategory={selectedCategory} />
        </Modal>
      </div>
    </>
  );
}
