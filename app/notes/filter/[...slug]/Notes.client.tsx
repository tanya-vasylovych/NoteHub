"use client";
import NoteList from "@/components/NoteList/NoteList";
import css from "./NotePage.module.css";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

interface NotesClientProps {
  tag: string;
}

const NoteClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 1000);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearchChange={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onChange={handlePageChange}
          />
        )}
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>

      {isPending && !data && <div>Loading...</div>}

      {isSuccess && data?.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        isSuccess && <div>No notes found</div>
      )}

      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <NoteForm />
        </Modal>
      )}
    </div>
  );
};

export default NoteClient;
