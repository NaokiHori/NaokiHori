import React, { JSX } from "react";
import { Heading1 } from "../../components/Heading/Heading";
import { Modal, useModal, ModalState } from "../../components/Modal/Modal";
import { DisplaySize } from "../../styles/responsive";
import { CoverImage } from "../CoverImage/CoverImage";
import { Category, RepositoryInfo } from "./models";
import { useRepositoryInfo, Handlers } from "./hooks";
import { Card } from "./Card/Card";
import coverImageSrc from "./rb2d.jpg";
import * as style from "./style.css";

function Title({
  category,
  displaySize,
  modalState,
  handlers,
}: {
  category: Category;
  displaySize: DisplaySize;
  modalState: ModalState;
  handlers: Handlers;
}): JSX.Element {
  return (
    <div
      className={style.mainTitle}
      style={{ textDecoration: category.isSelected ? "underline" : "none" }}
      onClick={() => {
        switch (displaySize) {
          case "Wide": {
            handlers.selectCategory(category.index);
            return;
          }
          case "Narrow": {
            handlers.selectCategory(category.index);
            modalState.openModal();
            return;
          }
          default: {
            throw new Error("unreachable");
          }
        }
      }}
    >
      {category.name}
    </div>
  );
}

function CardList({
  displaySize,
  categories,
}: {
  displaySize: DisplaySize;
  categories: Category[];
}): JSX.Element {
  const showHeader: boolean = displaySize === "Narrow";
  return (
    <div className={style.cardListContainer}>
      {categories.map((category: Category, categoryIndex: number) => {
        if (category.isSelected) {
          return (
            <React.Fragment key={categoryIndex}>
              {showHeader && (
                <div className={style.modalTitle}>{category.name}</div>
              )}
              {category.repositoryNames.map(
                (repositoryName: string, repositoryIndex: number) => (
                  <div key={repositoryIndex} className={style.cardContainer}>
                    <Card repositoryName={repositoryName} />
                  </div>
                ),
              )}
            </React.Fragment>
          );
        } else {
          return <React.Fragment key={categoryIndex} />;
        }
      })}
    </div>
  );
}

export function Repository(): JSX.Element {
  const {
    repositoryInfo,
    handlers,
  }: { repositoryInfo: RepositoryInfo; handlers: Handlers } =
    useRepositoryInfo();
  const categories: Category[] = repositoryInfo.categories;
  const modalState: ModalState = useModal(handlers.unselectCategory);
  // for wider screens, show titles and cards side-by-side
  // for narrower screens, only show titles and open modal when selected
  // all titles are displayed vertically
  // for wider screens, the container of the titles behaves as a flex item
  return (
    <>
      <CoverImage src={coverImageSrc} />
      <Heading1>GitHub Repository</Heading1>
      <div className={style.wideContainer}>
        <div className={style.titleListContainer}>
          {categories.map((category: Category, index: number) => (
            <Title
              key={index}
              displaySize="Wide"
              category={category}
              modalState={modalState}
              handlers={handlers}
            />
          ))}
        </div>
        <CardList displaySize="Wide" categories={categories} />
      </div>
      <div className={style.narrowContainer}>
        <div className={style.titleListContainer}>
          {categories.map((category: Category, index: number) => (
            <Title
              key={index}
              displaySize="Narrow"
              category={category}
              modalState={modalState}
              handlers={handlers}
            />
          ))}
        </div>
        <Modal modalState={modalState}>
          <CardList displaySize="Narrow" categories={categories} />
        </Modal>
      </div>
    </>
  );
}
